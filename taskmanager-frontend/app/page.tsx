
import React from 'react';
import TaskList from './components/TaskList';  // Import your task list component

export default function Home() {
  return (
    <div className="container">
      <h1 className="text-4xl font-bold text-center my-5"
       style={{
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        color:'white',
        padding:'10px',
        borderRadius:'3px'
        }}>Task Manager</h1>
      <TaskList /> {/* Use the TaskList component to display tasks */}
    </div>
  );
}
