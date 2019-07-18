const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecurityRolePermissionSchema = new Schema({
    role_id: {
        type: Schema.Types.ObjectId,
        ref: 'securityRole'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    content: { type: String },
    permission_level: { type: Number }
});

module.exports = SecurityRolePermission = mongoose.model('securityRolePermission', SecurityRolePermissionSchema);