const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  metaData: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    classification: { type: String, required: true }
  },
  creation: {
    from: {
      name: { type: String, required: true },
      rank: { type: String, required: true },
      id: { type: String, required: true }
    },
    date: { type: Date, default: Date.now },
    to: {
      name: { type: String, required: true },
      rank: { type: String, required: true },
      id: { type: String, required: true }
    }
  },
  messages: [{
    from: {
      id: { type: String }
    },
    message: {type: String, required: false}
  }],
  tags: [String],
  status: {
    read: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    disputed: { type: Boolean, default: false }
  },
  response: {
    completed: {
      date: { type: Date, default: Date.now },
      verified: { type: Boolean, default: false }
    },
    disputed: {
      reason: { type: String },
      accepted: { type: Boolean, default: false }
    }
  }
})

module.exports = Task = mongoose.model('task', TaskSchema);