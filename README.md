# TaskManager

This is a task management application built using **Next.js** and **React**.

## Features

- Add, update, and delete tasks.
- Responsive UI for task management.
- Integration with a backend to store task data.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
## Installation

Follow these steps to get the project up and running:

1. Clone this repository:
   git clone https://github.com/pratiksha-iitb/faoudass
2. cd .\faoudass\Backend\
3.  python -m venv venv   
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    venv\Scripts\activate
4. cd .\taskmanager\
    python manage.py runserver

    all tasks shown in a table -> http://127.0.0.1:8000/admin/tasks/task/
    all tasks pushed and fetched from ->http://127.0.0.1:8000/api/tasks/

5. open one new terminal for frontend
    cd .\faoudass\taskmanager-frontend\
    npm install
    npm run dev
    http://localhost:3000/
    