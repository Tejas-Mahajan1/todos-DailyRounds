import React, { useState } from 'react';
import Todo from './Todo';

const DUMMY_TODOS = [
  {
    id: '1',
    title: 'Complete Project Documentation',
    description: 'Write comprehensive documentation for the new feature implementation',
    priority: 'High',
    tags: ['documentation', 'urgent'],
    mentions: ['john', 'sarah'],
    createdAt: new Date('2024-02-15'),
    notes: [
      { content: 'Include API documentation', createdAt: new Date('2024-02-15') }
    ]
  },
  {
    id: '2',
    title: 'Review Pull Requests',
    description: 'Review and merge pending pull requests for the main branch',
    priority: 'Medium',
    tags: ['code-review', 'maintenance'],
    mentions: ['mike'],
    createdAt: new Date('2024-02-14'),
    notes: []
  },
  {
    id: '3',
    title: 'Weekly Team Meeting',
    description: 'Prepare agenda for weekly team sync and progress updates',
    priority: 'Low',
    tags: ['meeting', 'team'],
    mentions: ['alice', 'bob', 'charlie'],
    createdAt: new Date('2024-02-13'),
    notes: [
      { content: 'Discuss new project timeline', createdAt: new Date('2024-02-13') }
    ]
  },
  {
    id: '4',
    title: 'Bug Fix: Login Issue',
    description: 'Investigate and fix user authentication bug in production',
    priority: 'High',
    tags: ['bug', 'security'],
    mentions: ['david'],
    createdAt: new Date('2024-02-12'),
    notes: []
  },
  {
    id: '5',
    title: 'Update Dependencies',
    description: 'Update project dependencies to latest stable versions',
    priority: 'Medium',
    tags: ['maintenance', 'security'],
    mentions: ['emma'],
    createdAt: new Date('2024-02-11'),
    notes: []
  },
  {
    id: '6',
    title: 'Design Review',
    description: 'Review and provide feedback on new UI designs',
    priority: 'Medium',
    tags: ['design', 'feedback'],
    mentions: ['sarah', 'mike'],
    createdAt: new Date('2024-02-10'),
    notes: []
  },
  {
    id: '7',
    title: 'Performance Optimization',
    description: 'Optimize database queries for better performance',
    priority: 'High',
    tags: ['optimization', 'database'],
    mentions: ['john'],
    createdAt: new Date('2024-02-09'),
    notes: []
  },
  {
    id: '8',
    title: 'Write Unit Tests',
    description: 'Add unit tests for new features implemented last sprint',
    priority: 'Medium',
    tags: ['testing', 'quality'],
    mentions: ['alice'],
    createdAt: new Date('2024-02-08'),
    notes: []
  },
  {
    id: '9',
    title: 'Client Meeting Preparation',
    description: 'Prepare demo and presentation for client meeting',
    priority: 'High',
    tags: ['meeting', 'client'],
    mentions: ['bob', 'charlie', 'david'],
    createdAt: new Date('2024-02-07'),
    notes: []
  },
  {
    id: '10',
    title: 'Code Documentation',
    description: 'Add JSDoc comments to utility functions',
    priority: 'Low',
    tags: ['documentation', 'code'],
    mentions: ['emma'],
    createdAt: new Date('2024-02-06'),
    notes: []
  }
];

const TodoList = () => {
  const [todos, setTodos] = useState(DUMMY_TODOS); // Initialize with dummy data
  const [filter, setFilter] = useState({
    priority: '',
    tag: '',
    user: ''
  });
  const [sortBy, setSortBy] = useState('createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Changed to 5 to better show pagination

  // Get unique tags and mentions for filters
  const allTags = [...new Set(todos.flatMap(todo => todo.tags))];
  const allUsers = [...new Set(todos.flatMap(todo => todo.mentions))];

  // Filter and sort todos
  const filteredTodos = todos
    .filter(todo => {
      if (filter.priority && todo.priority !== filter.priority) return false;
      if (filter.tag && !todo.tags.includes(filter.tag)) return false;
      if (filter.user && !todo.mentions.includes(filter.user)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'priority') {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <select
          value={filter.priority}
          onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
          className="bg-gray-700 border border-gray-600 text-gray-100 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={filter.tag}
          onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
          className="bg-gray-700 border border-gray-600 text-gray-100 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        <select
          value={filter.user}
          onChange={(e) => setFilter({ ...filter, user: e.target.value })}
          className="bg-gray-700 border border-gray-600 text-gray-100 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="">All Users</option>
          {allUsers.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-700 border border-gray-600 text-gray-100 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>

      {/* Todo List */}
      <div className="space-y-4">
        {paginatedTodos.length > 0 ? (
          paginatedTodos.map(todo => (
            <Todo key={todo.id} {...todo} />
          ))
        ) : (
          <div className="text-center text-gray-400 py-8">
            No todos found matching your filters
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-gray-100'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList; 