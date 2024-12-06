// app/components/TaskList.js

'use client';  // Ensure this is a client-side component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import AddTask from './AddTask';  
import DeleteTask from './DeleteTask';
import CurrentDate from './CurrentDate';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tasks/');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);  // Add the new task to the list
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));  // Remove deleted task from the list
    };

    // const handleUpdateTask = (updatedTask) => {
    //     setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));  // Update the task in the list
    // };
    const navigateToEditTask = (taskId) => {
        router.push(`/edit/${taskId}`);  // Redirect to the edit task page
    };

    return (
        <div>
            <CurrentDate />
            <AddTask onAdd={handleAddTask} />  {/* Add the AddTask form */}
            <h1>Task List</h1>
            <div  className="task-list-container">
                {tasks.length === 0 && <p>No tasks available</p>}
                <ul>
                  {tasks.map((task) => (
                    <li key={task.id}>
                        <div>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
                            <button onClick={() => navigateToEditTask(task.id)}>Edit</button>
                            <DeleteTask taskId={task.id} onDelete={handleDeleteTask} />
                        </div>
                      
                    </li>
                   ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskList;

