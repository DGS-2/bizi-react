const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassificationSchema = new Schema({
    classification: { type: String }
});

module.exports = Classification = mongoose.model('classification', ClassificationSchema);