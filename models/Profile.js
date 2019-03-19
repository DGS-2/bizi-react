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
    promotionDates: [{
      rank: { type: String, required: true },
      date: { type: String, required: true }
    }],
    privilege: {
      title: { type: String },
      level: { type: Number, required: true }
    },
    tags: [String],
    teams: [{
      teamId: { type: String, required: true }
    }],
    invitations: [{
      teamId: { type: String, required: true },
      accepted: { type: Boolean, default: false }
    }],
    bio: { type: String },
    education: {
      military: [{
        year: { type: Number, required: true },
        school: {
          name: { type: String, required: true },
          unit: { type: String, required: true },
          location: {
            base: { type: String, required: true },
            state: { type: String, required: true }
          },
          joint: { type: Boolean, required:true }
        }
      }],
      professional: [{
        year: { type: Number, required: true },
        award: { type: String, required: true }, // Degree or Certificate
        school: {
          name: { type: String, required: true },
          state: { type: String, required: true },
          location: { type: String, required: true }
        }
      }]
    },
    assignments: [{
      from: { type: String, required: true },
      to: { type: String, required: true },
      position: { type: String, required: true },
      squadron: { type: String, required: true },
      location: { type: String, required: true },
      joint: { type: Boolean, required: true }
    }]
  },
  contacatInfo: {
    email: {
      unclass: { type: String, required: true }
    },
    phone: {
      unclass: { type: String }
    }
  },
  skills: [{
    name: { type: String, required: true },
    proficency: { type: Number, required: true },
    desire: { type: Number, required: true }
  }]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);