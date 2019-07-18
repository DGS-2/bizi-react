const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationUserSchema = new Schema({
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'organization'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    position: { type: String }
});

module.exports = OrganizationUser = mongoose.model('organizationUser', OrganizationUserSchema);