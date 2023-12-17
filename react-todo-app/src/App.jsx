// Import React and useState
import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to start editing a task
  const startEditing = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditedTaskText(taskText);
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTaskText("");
  };

  // Function to save edited task
  const saveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: editedTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskText("");
  };

  // Rendering the UI
  return (
    <div className="App">
      <h1 className="title">React To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter to do list..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="input"
        />
        <button onClick={addTask} className="btn-add">
          Add
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  className="inputs"
                />
                <button onClick={saveEditedTask}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
                <div className="task-actions">
                  <button onClick={() => toggleCompletion(task.id)}>
                    {task.completed ? "Undo" : "Check"}
                  </button>
                  <button onClick={() => startEditing(task.id, task.text)}>
                    Edit
                  </button>
                  <button onClick={() => removeTask(task.id)}>Remove</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
