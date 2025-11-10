const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskscontroller');

//get all tasks
router.get('/All', taskController.getAllTasks);
//get ask by id
router.get('/:id', taskController.getTaskById);
//create new task
router.post('/Create', taskController.createTask);
//update task
router.put('/:id', taskController.updateTask);
// delete task
router.delete('/delete/:id', taskController.deleteTask);

module.exports = router; 
