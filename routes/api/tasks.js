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

// @route   GET api/tasks/:id
// @desc    Get task by id
// @access  public
router.get('/:id', (req, res) => {
  Task.findById(req.params.id)
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
      title: req.body.title,
      description: req.body.description,
      classification: req.body.classification
    },
    creation: {
      from: {
        name: req.body.from.name,
        rank: req.body.from.rank,
        id: req.user.id
      },
      date: Date.now,
      to: {
        name: req.body.to.name,
        rank: req.body.to.rank,
        id: req.body.to.id
      }
    },
    messages: [{
      from: {
        id: req.user.id
      },
      message: req.body.message
    }],
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
        from: {
          id: req.user.id
        },
        message: req.body.message
      }

      task.messages.unshift(newComment)

      task.save().then(task => res.json(task))
    })
    .catch(err => res.status(404).json({tasknotfound: 'No Task Found'}))
})



module.exports = router;