// app/components/AddTask.js

'use client';  // Ensure this is a client-side component

import { useState } from 'react';
import axios from 'axios';

const AddTask = ({ onAdd }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        completed: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send POST request to backend to add new task
            const response = await axios.post('http://127.0.0.1:8000/api/tasks/', task);
            onAdd(response.data);  // Pass the new task to the parent component
            setTask({ title: '', description: '', completed: false });  // Clear the form
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div>
            <h2 
            style={{
                marginLeft:'40%'
            }}>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Add Task</button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;

