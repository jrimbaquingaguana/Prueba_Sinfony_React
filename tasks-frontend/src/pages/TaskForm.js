import { useState } from "react";

export default function TaskForm({ onTaskCreated, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.error || "Error al crear tarea");
        return;
      }

      const newTask = await response.json();
      onTaskCreated(newTask); // recarga lista automáticamente
      setTitle("");
      setDescription("");
      setError("");
      onClose(); // cierra el formulario
    } catch (err) {
      console.error("Error al crear tarea", err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px",
        backgroundColor: "#f9fafb",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      {error && (
        <div
          style={{
            color: "#b91c1c",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          {error}
        </div>
      )}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea..."
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción (opcional)..."
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          minHeight: "60px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Guardar
      </button>
    </form>
  );
}
