const express = require('express');
const app = express();
const PORT = 5000;

// ==========================================
// 1. Core Middleware
// ==========================================

// Parse JSON request body (Required for POST/PUT)
app.use(express.json());

// Request Logging Middleware (Global)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Supplementary Task 1: Check Content-Type header on POST and PUT requests
app.use((req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({ error: 'Content-Type must be application/json' });
    }
  }
  next();
});

// ==========================================
// 2. In-Memory Data Storage
// ==========================================
let tasks = [
  { id: 1, title: 'Learn Express.js', completed: false },
  { id: 2, title: 'Build REST API', completed: true }
];

// Supplementary Task 2: Middleware to validate task ID format
const validateTaskId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Task ID must be a valid number' });
  }
  req.taskId = id;
  next();
};

// ==========================================
// 3. CRUD Routes
// ==========================================

// GET /tasks - Fetch all tasks (Status: 200)
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET /tasks/:id - Fetch a single task by ID (Status: 200 / 404)
app.get('/tasks/:id', validateTaskId, (req, res) => {
  const task = tasks.find(t => t.id === req.taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(200).json(task);
});

// POST /tasks - Create a new task (Status: 201)
app.post('/tasks', (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: completed || false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task (Status: 200 / 404)
app.put('/tasks/:id', validateTaskId, (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, completed } = req.body;
  if (title !== undefined) tasks[taskIndex].title = title;
  if (completed !== undefined) tasks[taskIndex].completed = completed;

  res.status(200).json(tasks[taskIndex]);
});

// DELETE /tasks/:id - Delete a task (Status: 200 / 404)
app.delete('/tasks/:id', validateTaskId, (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted successfully', task: deletedTask[0] });
});

// ==========================================
// 4. Error & 404 Middleware
// ==========================================

// Supplementary Task 3: 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler (Must be defined last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});