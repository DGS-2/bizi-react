const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RankSchema = new Schema({
    full: { type: String },
    abreviated: { type: String }
});

module.exports = Rank = mongoose.model('rank', RankSchema);