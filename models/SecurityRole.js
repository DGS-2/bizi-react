const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecurityRoleSchema = new Schema({
    role_name: { type: String },
    role_level: { type: Number }
});

module.exports = SecurityRole = mongoose.model('securityRole', SecurityRoleSchema);