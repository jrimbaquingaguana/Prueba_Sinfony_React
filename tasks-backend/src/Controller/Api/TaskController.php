<?php

namespace App\Controller\Api;

use App\Entity\Task;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/tasks')]
class TaskController extends AbstractController
{
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    // Listar todas las tareas
    #[Route('', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $tasks = $this->em->getRepository(Task::class)->findAll();

        $data = array_map(fn($task) => [
            'id' => $task->getId(),
            'title' => $task->getTitle(),
            'description' => $task->getDescription(),
            'status' => $task->getStatus(),
            'created_at' => $task->getCreatedAt()->format('Y-m-d H:i:s'),
        ], $tasks);

        return $this->json($data);
    }

    // Crear una tarea
    #[Route('', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (empty($data['title'])) {
            return $this->json(['error' => 'El título es obligatorio'], 400);
        }

        $allowedStatus = ['pendiente', 'en_progreso', 'completada'];
        $status = $data['status'] ?? 'pendiente';
        if (!in_array($status, $allowedStatus)) {
            return $this->json(['error' => 'Estado inválido'], 400);
        }

        $task = new Task();
        $task->setTitle($data['title']);
        $task->setDescription($data['description'] ?? null);
        $task->setStatus($status);
        $task->setCreatedAt(new \DateTime());

        $this->em->persist($task);
        $this->em->flush();

        return $this->json(['message' => 'Tarea creada', 'id' => $task->getId()]);
    }

    // Actualizar una tarea
    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $task = $this->em->getRepository(Task::class)->find($id);
        if (!$task) return $this->json(['error' => 'Tarea no encontrada'], 404);

        $data = json_decode($request->getContent(), true);

        if (!empty($data['title'])) $task->setTitle($data['title']);
        if (isset($data['description'])) $task->setDescription($data['description']);
        if (!empty($data['status'])) {
            $allowedStatus = ['pendiente', 'en_progreso', 'completada'];
            if (!in_array($data['status'], $allowedStatus))
                return $this->json(['error' => 'Estado inválido'], 400);
            $task->setStatus($data['status']);
        }

        $this->em->flush();
        return $this->json(['message' => 'Tarea actualizada']);
    }

    // Eliminar una tarea
    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $task = $this->em->getRepository(Task::class)->find($id);
        if (!$task) return $this->json(['error' => 'Tarea no encontrada'], 404);

        $this->em->remove($task);
        $this->em->flush();
        return $this->json(['message' => 'Tarea eliminada']);
    }
}
