const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name: { type: String }
});

module.exports = Organization = mongoose.model('organization', OrganizationSchema);