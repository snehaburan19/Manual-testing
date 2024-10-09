const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data
let tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
];

// GET - Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST - Create a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT - Update a task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.title = req.body.title;
        task.completed = req.body.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// DELETE - Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
});
