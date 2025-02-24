"use client";

import { useState, useEffect, useRef, FC } from 'react';

interface Task {
    title: string;
    description: string;
    dueDate: string;
    timestamp: string;
}

const TodoApp: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const titleInput = useRef<HTMLInputElement>(null);
    const descriptionInput = useRef<HTMLInputElement>(null);
    const dueDateInput = useRef<HTMLInputElement>(null);
    const newItem = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]') as Task[];
        setTasks(storedTasks);
    }, []);

    const saveTasksToLocalStorage = (tasks: Task[]) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = () => {
        const titleValue = titleInput.current?.value.trim() ?? '';
        const descriptionValue = descriptionInput.current?.value.trim() ?? '';
        const dueDateValue = dueDateInput.current?.value.trim() ?? '';

        if (titleValue !== "") {
            const timestamp = new Date().toLocaleString();
            const task: Task = {
                title: titleValue,
                description: descriptionValue,
                dueDate: dueDateValue,
                timestamp: timestamp
            };
            const newTasks = [...tasks, task];
            setTasks(newTasks);
            saveTasksToLocalStorage(newTasks);
            if (titleInput.current) titleInput.current.value = '';
            if (descriptionInput.current) descriptionInput.current.value = '';
            if (dueDateInput.current) dueDateInput.current.value = '';
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
            const updatedTask = {
                ...task,
                title: newTitle,
                description: newDescription
            };
            const newTasks = tasks.map((t, i) => (i === index ? updatedTask : t));
            setTasks(newTasks);
            saveTasksToLocalStorage(newTasks);
        }
    };

    const deleteAllTasks = () => {
        setTasks([]);
        saveTasksToLocalStorage([]);
    };

    const searchTasks = (letter: string) => {
        const filteredTasks = tasks.filter(task => {
            const title = task.title.toLowerCase();
            const description = task.description.toLowerCase();
            const searchLetter = letter.toLowerCase();
            return title.startsWith(searchLetter) || description.startsWith(searchLetter);
        });
        renderFilteredTasks(filteredTasks);
    };

    const renderFilteredTasks = (filteredTasks: Task[]) => {
        if (newItem.current) {
            newItem.current.innerHTML = '';
            filteredTasks.slice().reverse().forEach((task, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `<strong>Title:</strong> ${task.title}<br>
                <strong>Description:</strong> ${task.description}<br>
                <strong>Timestamp:</strong> ${task.timestamp}
                <i onclick="delTask(${tasks.indexOf(task)})" class="fa-solid fa-trash"></i>
                <i onclick="updateTask(${tasks.indexOf(task)})" class="fa-solid fa-pen-to-square"></i>`;
                newItem.current?.appendChild(li);
            });
        }
    };

    const renderTasks = () => {
        return tasks.slice().reverse().map((task, index) => (
            <li key={index} className="list-group-item">
                <strong>Title:</strong> {task.title}<br />
                <strong>Description:</strong> {task.description}<br />
                <strong>Due Date:</strong> {task.dueDate}<br />
                <strong>Timestamp:</strong> {task.timestamp}
                <i onClick={() => delTask(index)} className="fa-solid fa-trash"></i>
                <i onClick={() => updateTask(index)} className="fa-solid fa-pen-to-square"></i>
            </li>
        ));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input type="text" placeholder="Title" ref={titleInput} />
            <input type="text" placeholder="Description" ref={descriptionInput} />
            <input type="date" ref={dueDateInput} />
            <button onClick={addTask}>Add Task</button>
            <button onClick={deleteAllTasks}>Delete All</button>
            <ul className="list-group" ref={newItem}>
                {renderTasks()}
            </ul>
        </div>
    );
};

export default TodoApp;
