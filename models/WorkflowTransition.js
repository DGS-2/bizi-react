const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkflowTransitionSchema = new Schema({
    start_state: {
        type: Schema.Types.ObjectId,
        ref: 'workflowState'
    },
    end_state: {
        type: Schema.Types.ObjectId,
        ref: 'workflowState'
    },
    is_approval_required: { type: Boolean }
});

module.exports = WorkflowTransition = mongoose.model('workflowTransition', WorkflowTransitionSchema);