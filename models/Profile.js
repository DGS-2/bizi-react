const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  rank: {
    type: String
  },
  permission: {
    type: Schema.Types.ObjectId,
    ref: 'securityRole'
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'organizationUser'
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);