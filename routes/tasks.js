// routes/tasks.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// CRUD
router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// extra: add tags 
router.post('/:id/tags', taskController.addTagsToTask);

module.exports = router;