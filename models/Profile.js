const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  organization: {
    wing: String,
    group: String,
    squadron: String,
    flight: String,
    team: String,
    office: String
  },
  personalInfo: {
    name: {
      full: { type: String },
      first: { type: String, require: true },
      last: { type: String, require: true }
    },
    rank: {
      full: { type: String },
      abreviated: { type: String, required: true }
    },
    promotionDates: {
      rank: { type: String },
      date: { type: String }
    },
    privilege: {
      title: { type: String },
      level: { type: Number }
    },
    tags: [String],
    teams: [{
      teamId: { type: String }
    }],
    invitations: [{
      teamId: { type: String },
      accepted: { type: Boolean, default: false }
    }],
    bio: { type: String },
    education: {
      military: [{
        year: { type: String },
        school: {
          name: { type: String },
          unit: { type: String },
          location: {
            base: { type: String },
            state: { type: String }
          },
          joint: { type: Boolean }
        }
      }],
      professional: [{
        year: { type: String },
        award: { type: String }, // Degree or Certificate
        school: {
          name: { type: String },
          state: { type: String }
        }
      }]
    },
    assignments: [{
      from: { type: String },
      to: { type: String },
      position: { type: String },
      squadron: { type: String },
      location: { type: String },
      joint: { type: Boolean }
    }]
  },
  contactInfo: {
    email: {
      unclass: { type: String, required: true }
    },
    phone: {
      unclass: { type: String }
    }
  },
  skills: [{
    name: { type: String }
  }]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);