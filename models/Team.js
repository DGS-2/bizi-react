const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  creator: {
    id: { type: String, required: true },
    displayName: { type: String }
  },
  invitations: [{
    id: { type: String, required: true },
    displayName: { type: String }
  }],
  members: [{
    id: { type: String, required: true },
    displayName: { type: String }
  }],
  messagesThreads: [{
    title: { type: String },
    messages: [{
      from: {
        id: { type: String },
        displayName: { type: String }
      },
      time: { type: Date, default: Date.now },
      message: { type: String }
    }]
  }],
  active: { type: Boolean, default: true }
})

module.exports = Team = mongoose.model('team', TeamSchema)