"use client";

import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  timestamp: string;
}

interface PromptProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const Prompt: React.FC<PromptProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-5 w-96">
        <h3 className="text-lg font-medium text-gray-800 text-center">{message}</h3>
        <div className="flex justify-between mt-5">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800"
          >
            Yes, proceed
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [promptOpen, setPromptOpen] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [actionType, setActionType] = useState<"delete" | "edit" | null>(null);

  const openPrompt = (index: number, type: "delete" | "edit") => {
    setSelectedTaskIndex(index);
    setActionType(type);
    setPromptOpen(true);
  };

  const closePrompt = () => {
    setPromptOpen(false);
    setSelectedTaskIndex(null);
    setActionType(null);
  };

  const confirmAction = () => {
    if (selectedTaskIndex !== null && actionType) {
      if (actionType === "delete") {
        const newTasks = tasks.filter((_, i) => i !== selectedTaskIndex);
        setTasks(newTasks);
      } else if (actionType === "edit") {
        const task = tasks[selectedTaskIndex];
        const newTitle = prompt("Enter new title:", task.title);
        const newDescription = prompt("Enter new description:", task.description);
        if (newTitle !== null && newDescription !== null) {
          const updatedTask = { ...task, title: newTitle, description: newDescription };
          const newTasks = tasks.map((t, i) => (i === selectedTaskIndex ? updatedTask : t));
          setTasks(newTasks);
        }
      }
    }
    closePrompt();
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Todo List</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="p-3 border-b flex justify-between items-center">
            <div>
              <strong>{task.title}</strong> - {task.description}
            </div>
            <div className="flex gap-2">
              <FaEdit
                className="text-blue-500 cursor-pointer"
                onClick={() => openPrompt(index, "edit")}
              />
              <MdDelete
                className="text-red-500 cursor-pointer"
                onClick={() => openPrompt(index, "delete")}
              />
            </div>
          </li>
        ))}
      </ul>
      <Prompt
        isOpen={promptOpen}
        onClose={closePrompt}
        onConfirm={confirmAction}
        message={actionType === "delete" ? "Are you sure you want to delete this task?" : "Are you sure you want to edit this task?"}
      />
    </div>
  );
};

export default TodoApp;
