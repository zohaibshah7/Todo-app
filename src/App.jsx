import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // 1 Load Tasks from LocalStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks); // Agar tasks saved hain unhe state mein load karo
    }
  }, []);

  // 2 Save Tasks to LocalStorage
  const saveToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // 3 Add or Update Task
  const addOrUpdateTask = () => {
    if (task.trim() === "") return;
    let updatedTasks;
    if (editIndex !== null) {
      updatedTasks = tasks.map((t, i) =>
        i === editIndex ? { ...t, text: task } : t
      );
      setEditIndex(null);
    } else {
      updatedTasks = [...tasks, { text: task, completed: false }];
    }
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks); // LocalStorage mein save karo
    setTask("");
  };

  // 4 Delete Task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks); // LocalStorage ko update karo
  };

  // 5 Toggle Complete
  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    saveToLocalStorage(updatedTasks); // LocalStorage ko update karo
  };

  // 6 Start Editing
  const startEditing = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  // 7 Handle Enter Key Press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addOrUpdateTask();
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="min-w-96 bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter a task"
            maxLength={50}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addOrUpdateTask}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
        <ul>
          {tasks.map((t, index) => (
            <li
              key={index}
              className="flex items-center justify-between mb-2 p-2 border border-gray-300 rounded-lg"
            >
              <span className={`flex-1 ${t.completed ? "line-through" : ""}`}>
                {t.text}
              </span>
              <button
                onClick={() => toggleComplete(index)}
                className={`ml-2 px-2 py-1 text-sm ${
                  t.completed ? "bg-yellow-500" : "bg-green-500"
                } text-white rounded-lg hover:opacity-80`}
              >
                {t.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => startEditing(index)}
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-lg hover:opacity-80 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded-lg hover:opacity-80 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
