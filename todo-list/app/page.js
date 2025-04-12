'use client';

import React, { useState } from 'react';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-900 py-8 text-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">Todo List</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-gray-100 rounded hover:bg-blue-700 transition-colors"
          >
            Create Todo
          </button>
        </div>

        <TodoList />

        {/* Create Todo Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-100">Create New Todo</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  ×
                </button>
              </div>
              <CreateTodo
                onSubmit={(todo) => {
                  console.log('New todo:', todo);
                  setIsCreateModalOpen(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
