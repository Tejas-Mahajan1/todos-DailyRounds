# Full Stack Todo List Application

A feature-rich todo list application built with Next.js for the frontend and Node.js/Express with MongoDB for the backend.

## Features

### Todo Management
- ✅ Create new todos with titles and descriptions
- ✅ Add tags and priority levels (High, Medium, Low)
- ✅ Tag/mention other users (@username)
- ✅ Edit existing todos
- ✅ Delete todos
- ✅ Add notes to todos via modal

### List View Features
- ✅ List all todos with basic information
- ✅ Pagination support
- ✅ Filter todos by:
  - Priority
  - Tags
  - Mentioned users
- ✅ Sort todos by:
  - Creation date
  - Priority

### User Management
- ✅ Pre-created users for testing
- ✅ User mention functionality
- ✅ User-specific todo views

### Data Export
- ✅ Export todos in JSON format
- ✅ Export todos in CSV format

## Tech Stack

### Frontend
- Next.js 14
- React
- Tailwind CSS
- TypeScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following content:

```

## Project Structure

```
├── Backend/
│   ├── models/
│   │   ├── Todo.js
│   │   └── User.js
│   ├── routes/
│   │   ├── todos.js
│   │   └── users.js
│   ├── index.js
│   └── package.json
│
├── todo-list/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Todo.tsx
│   │   │   ├── TodoList.tsx
│   │   │   └── CreateTodo.tsx
│   │   ├── page.js
│   │   └── layout.js
│   └── package.json
```

## License

This project is licensed under the MIT License.
