import { useState, useEffect } from "react";

export default function TaskList({ refresh }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:8000/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]); // recarga lista cuando cambia refresh

  const deleteTask = async (id) => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    await fetch(`http://localhost:8000/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const updateStatus = async (task) => {
    const nextStatus =
      task.status === "pendiente"
        ? "en_progreso"
        : task.status === "en_progreso"
        ? "completada"
        : "pendiente";

    await fetch(`http://localhost:8000/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    fetchTasks();
  };

  const statusColors = {
    pendiente: "#facc15",
    en_progreso: "#3b82f6",
    completada: "#16a34a",
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        border: "2px solid #e5e7eb",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f3f4f6" }}>
            <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>
              Título
            </th>
            <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb" }}>Descripción</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb" }}>Estado</th>
            <th style={{ padding: "12px", borderBottom: "2px solid #e5e7eb" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "12px" }}>{task.title}</td>
              <td style={{ padding: "12px" }}>{task.description || "-"}</td>
              <td style={{ padding: "12px" }}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    color: "#fff",
                    backgroundColor: statusColors[task.status],
                    fontSize: "14px",
                  }}
                >
                  {task.status}
                </span>
              </td>
              <td style={{ padding: "12px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => updateStatus(task)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#f97316",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Cambiar Estado
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
