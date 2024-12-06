// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditTask = ({ taskId, onUpdate }) => {
//     const [task, setTask] = useState({
//         title: '',
//         description: '',
//         completed: false,
//     });

//     useEffect(() => {
//         // Fetch the task data when the component mounts
//         const fetchTask = async () => {
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${taskId}/`);
//                 setTask(response.data);
//             } catch (error) {
//                 console.error('Error fetching task:', error);
//             }
//         };

//         fetchTask();
//     }, [taskId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTask({
//             ...task,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const updatedTask = {
//                 title: task.title,
//                 description: task.description,
//                 completed: task.completed,
//             };
//             const response = await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}/`, updatedTask);
//             onUpdate(response.data); // Notify the parent component about the update
//         } catch (error) {
//             console.error('Error updating task:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Edit Task</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="title">Title</label>
//                     <input
//                         type="text"
//                         id="title"
//                         name="title"
//                         value={task.title}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="description">Description</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={task.description}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="completed">Completed</label>
//                     <input
//                         type="checkbox"
//                         id="completed"
//                         name="completed"
//                         checked={task.completed}
//                         onChange={() => setTask({ ...task, completed: !task.completed })}
//                     />
//                 </div>
//                 <button type="submit">Save Changes</button>
//             </form>
//         </div>
//     );
// };

// export default EditTask;
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';  // Import useRouter for navigation

const EditTask = ({ taskId, onUpdate }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        completed: false,
    });

    const [loading, setLoading] = useState(true);  // State to manage the loading status
    const [error, setError] = useState(null);  // State to manage error messages
    const [successMessage, setSuccessMessage] = useState('');  // State for success message

    const router = useRouter();  // Initialize useRouter

    useEffect(() => {
        // Fetch the task data when the component mounts
        const fetchTask = async () => {
            try {
                setLoading(true);  // Start loading
                const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${taskId}/`);
                setTask(response.data);  // Set task data from the API response
                setLoading(false);  // Stop loading once data is fetched
            } catch (error) {
                console.error('Error fetching task:', error);
                setError('Failed to load task data. Please try again.');  // Display error message
                setLoading(false);  // Stop loading even in case of error
            }
        };

        fetchTask();
    }, [taskId]);

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
            // Prepare the updated task data
            const updatedTask = {
                title: task.title,
                description: task.description,
                completed: task.completed,
            };

            // Send the PUT request to update the task
            const response = await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}/`, updatedTask);

            // Update the parent component with the new task data
            onUpdate(response.data);

            // Show success message
            setSuccessMessage('Your changes have been saved!');

            // Optionally hide the success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage('');  // Clear success message after 1 seconds
                router.push('/');  // Redirect to the task list page
            }, 1000);  // 1-second delay before redirecting

        } catch (error) {
            console.error('Error updating task:', error);
            setError('Failed to update task. Please try again.');  // Display error message on update failure
        }
    };

    if (loading) {
        return <p>Loading task...</p>;  // Display loading text while data is being fetched
    }

    return (
        <div>
            {/* <h2>Edit Task</h2> */}
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message if there's an error */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}  {/* Display success message */}

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
                    <label htmlFor="completed">Completed</label>
                    <input
                        type="checkbox"
                        id="completed"
                        name="completed"
                        checked={task.completed}
                        onChange={() => setTask({ ...task, completed: !task.completed })}
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditTask;




