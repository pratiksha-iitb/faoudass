'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';  // Import useParams to access route params
import EditTask from '../../components/EditTask';  // Import the EditTask component

const EditTaskPage = () => {
    const { taskId } = useParams();  // Use useParams to get taskId from the URL params

    const [task, setTask] = useState(null);  // Initialize state with null
    const [loading, setLoading] = useState(true);  // State for loading indicator
    const [error, setError] = useState(null);  // State for error handling

    useEffect(() => {
        const fetchTask = async () => {
            try {
                setLoading(true);  // Start loading
                const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${taskId}/`);
                setTask(response.data);  // Set task data from the API response
                setLoading(false);  // Stop loading once data is fetched
            } catch (error) {
                setError('Failed to load task.');  // Display error if the fetch fails
                setLoading(false);  // Stop loading even in case of error
            }
        };

        if (taskId) {
            fetchTask();  // Fetch the task data only if taskId is available
        }
    }, [taskId]);  // Run when taskId changes

    if (loading) {
        return <p>Loading task...</p>;  // Show loading text while data is being fetched
    }

    if (error) {
        return <p>{error}</p>;  // Show error if task fetch fails
    }

    return (
        <div>
            <h1>Edit Task</h1>
            {task ? (
                <EditTask task={task} taskId={taskId} onUpdate={(updatedTask) => setTask(updatedTask)} />
            ) : (
                <p>Task not found</p>
            )}
        </div>
    );
};

export default EditTaskPage;
