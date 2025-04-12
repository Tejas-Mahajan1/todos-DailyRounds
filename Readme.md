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

## Database Schema

### Todo Model
```javascript
{
  title: String,
  description: String,
  priority: Enum['High', 'Medium', 'Low'],
  tags: [String],
  mentions: [ObjectId],
  notes: [{
    content: String,
    createdAt: Date
  }],
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### User Model
```javascript
{
  username: String,
  email: String,
  createdAt: Date
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
