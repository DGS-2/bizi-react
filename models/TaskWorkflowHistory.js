const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskWorkflowHistorySchema = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    },
    transition: {
        type: Schema.Types.ObjectId,
        ref: 'workflowTransition'
    },
    completed_by: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: {
        type: Date
    }
});

module.exports = TaskWorkflowHistory = mongoose.model('taskWorkflowHistory', TaskWorkflowHistorySchema);