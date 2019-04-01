const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  name: { type: String, required: true },
  claimedBy: [{
    id: { type: String, required: true },
    displayName: { type: String, required: true }
  }]
})

module.exports = Skill = mongoose.model('skill', SkillSchema)