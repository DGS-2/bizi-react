const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessControlSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    security_role: {
        type: Schema.Types.ObjectId,
        ref: 'securityRole'
    }
});

module.exports = AccessControl = mongoose.model('accessControl', AccessControlSchema)