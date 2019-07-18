const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationStructureSchema = new Schema({
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: 'organization'
    },
    child_id: {
        type: Schema.Types.ObjectId,
        ref: 'organization'
    }
});

module.exports = OrganizationStructure = mongoose.model('organizationStructure', OrganizationStructureSchema);