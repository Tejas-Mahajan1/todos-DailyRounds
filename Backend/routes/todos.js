const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const { body, validationResult } = require('express-validator');

// Get all todos with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, priority, tag, user, sortBy = 'createdAt' } = req.query;
    
    const query = {};
    if (priority) query.priority = priority;
    if (tag) query.tags = tag;
    if (user) query.mentions = user;

    const sort = {};
    sort[sortBy] = sortBy === 'priority' ? 1 : -1;

    const todos = await Todo.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'username')
      .populate('mentions', 'username');

    const count = await Todo.countDocuments(query);

    res.json({
      todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new todo
router.post('/', [
  body('title').notEmpty().trim(),
  body('description').notEmpty(),
  body('priority').isIn(['High', 'Medium', 'Low']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const todo = new Todo({
      ...req.body,
      createdBy: req.body.userId // In a real app, this would come from auth middleware
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add note to todo
router.post('/:id/notes', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.notes.push({ content: req.body.content });
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export todos
router.get('/export', async (req, res) => {
  try {
    const { userId, format = 'json' } = req.query;
    const todos = await Todo.find({ createdBy: userId })
      .populate('createdBy', 'username')
      .populate('mentions', 'username');

    if (format === 'csv') {
      // Convert to CSV format
      const csv = convertToCSV(todos);
      res.header('Content-Type', 'text/csv');
      res.attachment('todos.csv');
      return res.send(csv);
    }

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 