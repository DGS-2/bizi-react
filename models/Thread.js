const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    },
    date: { type: Date },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    message: {
        type: String
    },
    file: {
        type: Schema.Types.ObjectId,
        ref: 'file'
    }
});

module.exports = Thread = mongoose.model('thread', ThreadSchema);