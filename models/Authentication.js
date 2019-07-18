const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthenticationSchema = new Schema({
    email: { type: String },
    password: { type: String }
});

module.exports = Authentication = mongoose.model('auth', AuthenticationSchema);