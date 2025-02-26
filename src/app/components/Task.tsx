"use client";

import React, { useState, useEffect, useRef } from "react";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  timestamp: string;
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const titleInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);
  const dueDateInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
    setTasks(storedTasks);
  }, []);

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = () => {
    const titleValue = titleInput.current?.value.trim() ?? "";
    const descriptionValue = descriptionInput.current?.value.trim() ?? "";
    const dueDateValue = dueDateInput.current?.value.trim() ?? "";

    if (titleValue !== "") {
      const timestamp = new Date().toLocaleString();
      const task: Task = { title: titleValue, description: descriptionValue, dueDate: dueDateValue, timestamp };
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      saveTasksToLocalStorage(newTasks);
      if (titleInput.current) titleInput.current.value = "";
      if (descriptionInput.current) descriptionInput.current.value = "";
      if (dueDateInput.current) dueDateInput.current.value = "";
      if (titleInput.current) titleInput.current.focus();
    } else {
      alert("Please enter a task!");
    }
  };

  const delTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const updateTask = (index: number) => {
    const task = tasks[index];
    const newTitle = prompt("Enter new title:", task.title);
    const newDescription = prompt("Enter new description:", task.description);
    if (newTitle !== null && newDescription !== null) {
      const updatedTask = { ...task, title: newTitle, description: newDescription };
      const newTasks = tasks.map((t, i) => (i === index ? updatedTask : t));
      setTasks(newTasks);
      saveTasksToLocalStorage(newTasks);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded-lg font-patrick-hand backdrop-blur-xs bg-opacity-80">
      <h1 className="text-2xl font-bold text-center mb-5">Todo List</h1>
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full p-2 mb-3 border rounded-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        ref={titleInput}
        className="w-full p-2 mb-3 border rounded-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Description"
        ref={descriptionInput}
        className="w-full p-2 mb-3 border rounded-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="date"
        ref={dueDateInput}
        className="w-full p-2 mb-3 border rounded-sm focus:outline-hidden focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex justify-between">
        <button
          onClick={addTask}
          className="flex-1 p-2 mb-3 bg-gray-500 text-white rounded-sm hover:bg-black mr-1"
        >
          Add Task
        </button>
        <button
          onClick={() => { setTasks([]); saveTasksToLocalStorage([]); }}
          className="flex-1 p-2 mb-3 bg-gray-500 text-white rounded-sm hover:bg-black ml-1"
        >
          Delete All
        </button>
      </div>
      <ul className="list-none p-0 mt-5">
        {filteredTasks.map((task, index) => (
          <li key={index} className="list-group-item">
            <strong>Title:</strong> {task.title}<br />
            <strong>Description:</strong> {task.description}<br />
            <strong>Due Date:</strong> {task.dueDate}<br />
            <strong>Timestamp:</strong> {task.timestamp}<br />
            <button onClick={() => delTask(index)} className="text-red-500 ml-2">Delete</button>
            <button onClick={() => updateTask(index)} className="text-blue-500 ml-2">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
