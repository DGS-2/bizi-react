const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecurityPermissionSchema = new Schema({
    permission: { type: String }
});

module.exports = SecurityPermission = mongoose.model('securityPermission', SecurityPermissionSchema);