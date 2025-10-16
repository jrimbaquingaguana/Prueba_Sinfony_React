import { useState } from "react";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const handleTaskCreated = () => setRefresh((prev) => prev + 1);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#10b981",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {showForm ? "Cerrar Formulario" : "Nueva Tarea"}
        </button>
      </div>

      {showForm && <TaskForm onTaskCreated={handleTaskCreated} onClose={() => setShowForm(false)} />}
      <TaskList refresh={refresh} />
    </div>
  );
}
