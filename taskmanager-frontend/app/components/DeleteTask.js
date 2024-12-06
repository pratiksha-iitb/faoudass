import axios from 'axios';

const DeleteTask = ({ taskId, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}/`);
            onDelete(taskId); // Notify the parent component about the deletion
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <button onClick={handleDelete} style={{ color: 'red' }}>
            Delete Task
        </button>
    );
};

export default DeleteTask;
