const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    uri: { type: String }
});

module.exports = File = mongoose.model('file', FileSchema);