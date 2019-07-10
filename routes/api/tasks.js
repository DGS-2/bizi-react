const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Task = require("../../models/Task");
const Profile = require("../../models/Profile");


// @route   GET api/tasks
// @desc    Get all tasks
// @access  public
router.get('/', (req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(404).json({noTasksFound: 'No tasks were found'}))
})

//@route    POST /tasks/sub-tasks/:id
//@desc     Create sub tasks within a task
//@access   Private
router.post('/sub-task/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const subTasks = req.body.subTasks
  // Create Each New Task and get Id to store in original Task's subTasks
  subTasks.forEach(item => {
    // Save the new task
    let newTask = new Task(item)
    newTask.save().then(sub => {
      // Find original task
      Task.findOne({ _id: req.params.id})
      .then(task => {
        if(task){
          // Add newly created task id to original task subTask array
          task.subTasks = [...task.subTasks].concat(sub)
          Task.findOneAndUpdate({ _id: req.params.id}, {$set : task}, {new: true})
            .then(update => res.status(200).json(update))
            .catch(err => res.status(404).json(err))
        }
      })
      .catch(err => res.status(404).json(err))
    })
  })

  
  
})

// @route   GET api/tasks/:id
// @desc    Get task by id
// @access  public
router.get('/:id', (req, res) => {
  Task.findOne({_id: req.params.id})
    .then(task => {
      if(task){
        res.json(task)
      } else {
        res.status(404).json({noTasksFound: 'No task with that ID was found'})
      }
    })
    .catch(err => res.status(404).json({noTasksFound: 'No task with that ID was found'}))
})

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const newTask = new Task({
    metaData: {
      title: req.body.metaData.title,
      description: req.body.metaData.description,
      classification: req.body.metaData.classification
    },
    creation: {
      from: {
        name: req.body.creation.from.name,
        rank: req.body.creation.from.rank,
        id: req.user.id
      },
      date: Date.now(),
      due: req.body.creation.due,
      to: {
        name: req.body.creation.to.name,
        rank: req.body.creation.to.rank,
        id: req.body.creation.to.id
      },
      priority: {
        level: req.body.creation.priority.level
      }
    },
    messages: req.body.messages,
    subTasks: req.body.subTasks || [],
    tags: req.body.tags || [],
    status: {
      read: false,
      completed: false,
      disputed: false
    },
    response: {
      completed: {
        date: '',
        verified: false
      },
      disputed: {
        reason: '',
        accepted: false
      }
    }

  })
  
  newTask.save().then(task => res.json(task))
})

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id})
    .then(profile => {
      Task.findById(req.params.id)
        .then(task => {
          if(task.creation.from.id.toString() !== req.user.id) {
            return res.status(401).json({notauthorized: 'You do not have permissions to perform this action'})
          }

          task.remove().then(() => res.json({success: true}))
        })
        .catch(err => res.status(400).json({tasknotfound: 'The task could not be found'}))
    })
})

// @route   POST api/tasks/reply/:id
// @desc    Reply to a task message thread
// @access  Private
router.post('/reply/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      const newComment = {
        from: req.user.id,
        message: req.body.message,
        time: req.body.time
      }

      task.messages.unshift(newComment)

      task.save().then(task => res.json(task))
    })
    .catch(err => res.status(404).json({tasknotfound: 'No Task Found'}))
})

router.post('/set-status/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  let status = {
    open: req.body.status.open,
    inProgress: req.body.status.inProgress,
    resolved: req.body.status.resolved,
    reopened: req.body.status.reopened,
    closed: req.body.status.closed
  };

  let workflow = {
    readyForReview: req.body.workflow.readyForReview,
    reviewed: req.body.workflow.reviewed,
    blocked: req.body.workflow.blocked,
    pendingApproval: req.body.workflow.pendingApproval,
    approved: req.body.workflow.approved,
    completed: req.body.workflow.completed
  };
  
  Task.findOneAndUpdate(
    { _id: req.params.id },
    { $set: {"status" : status, "workflow": workflow} }
  )
  .then(task => {
    res.json(task)
  })
  .catch(err => res.status(404).json({tasknotfound: "No Task Found"}))
})

module.exports = router;