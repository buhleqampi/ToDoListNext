"use client";

import React, { useState, useEffect, useRef } from "react";

interface Task {
  name: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<"name" | "dueDate" | "priority" | "">("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);
  const dueDateInput = useRef<HTMLInputElement>(null);
  const priorityInput = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
    setTasks(storedTasks);
  }, []);

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = () => {
    const nameValue = nameInput.current?.value.trim() ?? "";
    const descriptionValue = descriptionInput.current?.value.trim() ?? "";
    const dueDateValue = dueDateInput.current?.value.trim() ?? "";
    const priorityValue = priorityInput.current?.value as "Low" | "Medium" | "High";

    if (nameValue !== "") {
      const task: Task = { name: nameValue, description: descriptionValue, dueDate: dueDateValue, priority: priorityValue };
      const newTasks = [task, ...tasks]; 
      setTasks(newTasks);
      saveTasksToLocalStorage(newTasks);

    
      nameInput.current!.value = "";
      descriptionInput.current!.value = "";
      dueDateInput.current!.value = "";
      priorityInput.current!.value = "Medium";
      nameInput.current!.focus();
    } else {
      alert("Please enter a task!");
    }
  };

  const delTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  const priorityOrder = { High: 3, Medium: 2, Low: 1 };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    if (sortOption === "dueDate") return a.dueDate.localeCompare(b.dueDate);
    if (sortOption === "priority") return priorityOrder[b.priority] - priorityOrder[a.priority];
    return 0;
  });

  const filteredTasks = sortedTasks.filter(
    (task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Todo List</h1>
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full p-2 mb-3 border rounded-sm focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="w-full p-2 mb-3 border rounded-sm focus:ring-2 focus:ring-blue-400"
        onChange={(e) => setSortOption(e.target.value as "name" | "dueDate" | "priority" | "")}
      >
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
      <input type="text" placeholder="Title" ref={nameInput} className="w-full p-2 mb-3 border rounded-sm" />
      <input type="text" placeholder="Description" ref={descriptionInput} className="w-full p-2 mb-3 border rounded-sm" />
      <input type="date" ref={dueDateInput} className="w-full p-2 mb-3 border rounded-sm" />
      <select ref={priorityInput} defaultValue="Medium" className="w-full p-2 mb-3 border rounded-sm">
        <option value="Low">Low Priority</option>
        <option value="Medium">
          Medium Priority
        </option>
        <option value="High">High Priority</option>
      </select>
      <div className="flex justify-between">
        <button onClick={addTask} className="flex-1 p-2 mb-3 bg-gray-500 text-white rounded-sm hover:bg-black mr-1">
          Add Task
        </button>
        <button onClick={() => { setTasks([]); saveTasksToLocalStorage([]); }} className="flex-1 p-2 mb-3 bg-gray-500 text-white rounded-sm hover:bg-black ml-1">
          Delete All
        </button>
      </div>
      <ul className="list-none p-0 mt-5">
        {filteredTasks.map((task, index) => (
          <li key={index} className="cursor-pointer p-2 border-b" onClick={() => setSelectedTask(task)}>
            <strong>Name:</strong> {task.name}
            <br />
            <strong>Description:</strong> {task.description}
          </li>
        ))}
      </ul>

      {/* Modal */}
      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-3">{selectedTask.name}</h2>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setSelectedTask(null)} className="p-2 bg-gray-500 text-white rounded-sm hover:bg-black">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoApp;

