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
    due: { type: Date, default: Date.now },
    to: {
      name: { type: String, required: true },
      rank: { type: String, required: true },
      id: { type: String, required: true }
    },
    priority: {
      level: { type: String, required: true }
    }
  },
  messages: [{
    from: { type: String, required: false },
    message: {type: String, required: false},
    time: { type: Date, default: Date.now }
  }],
  subTasks: [{
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
      due: { type: Date, default: Date.now },
      to: {
        name: { type: String, required: true },
        rank: { type: String, required: true },
        id: { type: String, required: true }
      },
      priority: {
        level: { type: String, required: true }
      }
    },
    messages: [{
      from: { type: String, required: false },
      message: {type: String, required: false},
      time: { type: Date, default: Date.now }
    }],
    status: {
      open: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
      inProgress: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
      resolved: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
      reopened: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
      closed: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } }
    },
    workflow: {
      readyForReview: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
      reviewed: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
      blocked: { isStarted: {type: Boolean, required: false, default: false}, reason: { type: String, default: '' }, date: { type: Date } },
      pendingApproval: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
      approved: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
      completed: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } }
    }
  }],
  tags: [String],
  status: {
    open: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
    inProgress: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
    resolved: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
    reopened: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
    closed: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } }
  },
  workflow: {
    readyForReview: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
    reviewed: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
    blocked: { isStarted: {type: Boolean, required: false, default: false}, reason: { type: String, default: '' }, date: { type: Date } },
    pendingApproval: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
    approved: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } },
    completed: { isStarted: {type: Boolean, required: false, default: false}, date: { type: Date } }
  }
})

module.exports = Task = mongoose.model('task', TaskSchema);