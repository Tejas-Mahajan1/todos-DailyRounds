import React, { useState } from 'react';


const CreateTodo = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [mentionInput, setMentionInput] = useState('');
  const [mentions, setMentions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      tags,
      mentions
    });
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setTags([]);
    setMentions([]);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleMentionAdd = () => {
    if (mentionInput.trim() && !mentions.includes(mentionInput.trim())) {
      setMentions([...mentions, mentionInput.trim()]);
      setMentionInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:border-blue-500"
          rows={3}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:border-blue-500"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:border-blue-500"
            placeholder="Add a tag"
          />
          <button
            type="button"
            onClick={handleTagAdd}
            className="px-4 py-2 bg-blue-600 text-gray-100 rounded hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-900 text-blue-100 px-2 py-1 rounded text-sm"
            >
              #{tag}
              <button
                type="button"
                onClick={() => setTags(tags.filter((_, i) => i !== index))}
                className="ml-2 text-blue-300 hover:text-blue-100"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Mentions
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={mentionInput}
            onChange={(e) => setMentionInput(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:border-blue-500"
            placeholder="Mention a user"
          />
          <button
            type="button"
            onClick={handleMentionAdd}
            className="px-4 py-2 bg-blue-600 text-gray-100 rounded hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {mentions.map((mention, index) => (
            <span
              key={index}
              className="text-blue-300"
            >
              @{mention}
              <button
                type="button"
                onClick={() => setMentions(mentions.filter((_, i) => i !== index))}
                className="ml-2 text-red-400 hover:text-red-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-gray-100 rounded hover:bg-blue-700 transition-colors"
      >
        Create Todo
      </button>
    </form>
  );
};

export default CreateTodo; 