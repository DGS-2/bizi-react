const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkflowSchema = new Schema({
    date: { type: Date },
    status: { type: String },
    completed_by: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = Workflow = mongoose.model('workflow', WorkflowSchema);