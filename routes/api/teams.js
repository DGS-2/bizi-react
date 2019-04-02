const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const Team = require('../../models/Team');

//@route    GET /teams/
//@desc     Gather all teams
//@access   Public
router.get('/all', (req, res) => {
  Team.find()
    .then(team => res.status(200).json(team))
    .catch(err => res.status(400).json({ noteam: "There were no teams available" }))
})

//@route    POST /teams/create
//@desc     Create a new team
//@access   Private
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
  const invitations = req.body.teamInvitations
  
  const newTeam = new Team({
    name: req.body.teamName,
    description: req.body.teamDescription,
    creator: req.body.teamCreator,
    invitations: invitations,
    members: req.body.teamMembers,
    messageThreads: req.body.teamMessageThread
  })
  console.log(newTeam)
  newTeam.save().then(team => res.json(team))

  invitations.forEach(invite => {
    // let field = user.id
    Profile.findOne({ user: invite.id })
      .then(profile => {
        if(profile){
          profile.invitations.push({ teamId: newTeam._id, accepted: false })

          Profile.findByIdAndUpdate(
            { user: invite.id },
            { $set: profile },
            { new: true }
          ).then(update => res.json(update))
        }
      })
      .catch(err => res.status(400).json({ noprofile: "Profile not found" }))
  })

  
})

//@route    GET /teams/:id
//@desc     Get team by Id
//@access   Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Team.findById(req.params.id)
    .then(team => {
      if(team.active){
        res.json(team)
      } else {
        res.json({ teaminactive: "This team has been deactivated" })
      }
    })
    .catch(err => res.status(404).json({ teamnotfound: "Team could not be found" }))
})


module.exports = router