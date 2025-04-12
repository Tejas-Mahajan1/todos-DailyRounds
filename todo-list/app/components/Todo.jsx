import React, { useState } from 'react';



const Todo = ({
  id,
  title,
  description,
  priority,
  tags,
  mentions,
  createdAt
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState('');

  const priorityColors = {
    High: 'bg-red-900 text-red-100',
    Medium: 'bg-yellow-900 text-yellow-100',
    Low: 'bg-green-900 text-green-100'
  };

  return (
    <div className="border border-gray-700 rounded-lg p-4 mb-4 bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          <p className="text-gray-400 mt-1">{description}</p>
        </div>
        <span className={`${priorityColors[priority]} px-2 py-1 rounded text-sm`}>
          {priority}
        </span>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-blue-900 text-blue-100 px-2 py-1 rounded text-sm">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="mt-2 flex flex-wrap gap-2">
        {mentions.map((mention, index) => (
          <span key={index} className="text-blue-300">
            @{mention}
          </span>
        ))}
      </div>
      
      <div className="mt-3 flex justify-between items-center text-sm text-gray-400">
        <span>{new Date(createdAt).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Add Note
          </button>
          <button className="text-green-400 hover:text-green-300 transition-colors">Edit</button>
          <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
        </div>
      </div>

      {/* Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg w-96">
            <h4 className="text-lg font-semibold mb-3 text-gray-100">Add Note</h4>
            <textarea
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:border-blue-500 mb-3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle save note
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-gray-100 rounded hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo; 