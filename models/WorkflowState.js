const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkflowStateSchema = new Schema({
    workflow: {
        type: Schema.Types.ObjectId,
        ref: 'workflow'
    },
    state: { type: String }
});

module.exports = WorkflowState = mongoose.model('workflowState', WorkflowStateSchema);