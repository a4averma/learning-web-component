'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);
