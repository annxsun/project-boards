var express = require('express');
var router = express.Router();
var taskController = require('../controller/task.controller.js');

router.get('/tasklist', taskController.taskList);
router.post('/tasklist/add', taskController.taskListAdd);
router.put('/tasklist/id/:id/name/:name', taskController.taskListUpdateName);
router.delete('/tasklist/id/:id', taskController.taskListDelete);
router.put('/tasklist/fromId/:fromId/toId/:toId', taskController.taskListMvALL);
router.post('/taskItem/add', taskController.taskItemAdd);
router.delete('/taskItem/:taskListId/taskId/:taskId', taskController.taskItemDelete);
router.put('/taskItem/update', taskController.taskItemUpdate);
router.put('/taskItem/fromId/:fromId/toId/:toId/task/:id', taskController.taskItemMv);

module.exports = router;