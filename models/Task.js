const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  classification: {
    type: Schema.Types.ObjectId,
    ref: 'classification'
  },
  title: { type: String },
  description: { type: String },
  files: [{
    type: Schema.Types.ObjectId,
    ref: 'file'
  }],
  created_on: { type: Date, default: Date.now },
  due_by: { type: Date },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  assigned_to: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  parent_task: {
    type: Schema.Types.ObjectId,
    ref: 'task'
  },
  message_thread: {
    type: Schema.Types.ObjectId,
    ref: 'thread'
  },
  workflow: {
    type: Schema.Types.ObjectId,
    ref: 'workflow'
  }
});

module.exports = Task = mongoose.model('task', TaskSchema);