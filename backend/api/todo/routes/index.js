'use strict';
import todoList from '../controllers';
module.exports = function(app) {

  // todoList Routes
  app.route('/tasks')
    .get(todoList.getAllTasks)
    .post(todoList.createTask);


  app.route('/tasks/:taskId')
    .get(todoList.getTask)
    .put(todoList.updateTask)
    .delete(todoList.deleteTask);
};
