const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Mongoose Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/
// @desc    Get current or edit user profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  // Get fields
  const profileFields = {}
  profileFields.user = req.user.id
  // Gather organizational data
  if(req.body.organization.wing) profileFields.organization.wing = req.body.organization.wing
  if(req.body.organization.group) profileFields.organization.group = req.body.organization.group
  if(req.body.organization.squadron) profileFields.organization.squadron = req.body.organization.squadron
  if(req.body.organization.flight) profileFields.organization.flight = req.body.organization.flight
  if(req.body.organization.team) profileFields.organization.team = req.body.organization.team
  if(req.body.organization.office) profileFields.organization.office = req.body.organization.office
  // Gather personal data
  if(req.body.personalInfo.name.full) profileFields.personalInfo.name.full = req.body.personalInfo.name.full
  if(req.body.personalInfo.name.first) profileFields.personalInfo.name.first = req.body.personalInfo.name.first
  if(req.body.personalInfo.name.last) profileFields.personalInfo.name.last = req.body.personalInfo.name.last
  if(req.body.personalInfo.rank.rull) profileFields.personalInfo.rank.rull = req.body.personalInfo.rank.rull
  if(req.body.personalInfo.rank.abreviated) profileFields.personalInfo.rank.abreviated = req.body.personalInfo.rank.abreviated
  if(req.body.personalInfo.promotionDates.rank) profileFields.personalInfo.promotionDates.rank = req.body.personalInfo.promotionDates.rank
  if(req.body.personalInfo.promotionDates.date) profileFields.personalInfo.promotionDates.date = req.body.personalInfo.promotionDates.date
  if(req.body.personalInfo.privilege.title) profileFields.personalInfo.privilege.title = req.body.personalInfo.privilege.title
  if(req.body.personalInfo.privilege.level) profileFields.personalInfo.privilege.level = req.body.personalInfo.privilege.level
  if(req.body.personalInfo.tags) profileFields.personalInfo.tags = req.body.personalInfo.tags
  if(req.body.personalInfo.teams.teamId) profileFields.personalInfo.teams.teamId = req.body.personalInfo.teams.teamId
  if(req.body.personalInfo.invitations.teamId) profileFields.personalInfo.invitations.teamId = req.body.personalInfo.invitations.teamId
  if(req.body.personalInfo.invitations.accepted) profileFields.personalInfo.invitations.accepted = req.body.personalInfo.invitations.accepted
  if(req.body.personalInfo.bio) profileFields.personalInfo.bio = req.body.personalInfo.bio
  // Education
  if(typeof req.body.education.military !== 'undefined') {
    profileFields.education.military = req.body.education.military.split(',');
  }

  if(typeof req.body.education.professional !== 'undefined') {
    profileFields.education.professional = req.body.education.professional.split(',');
  }

  // Assignments
  if(typeof req.body.assignments !== 'undefined'){
    profileFields.assignments = req.body.assignments.split(',')
  }
  // Contact
  if(req.body.contactInfo.email.unclass) profile.contactInfo.email.unclass = req.body.contactInfo.email.unclass

  if(req.body.contactInfo.phone.unclass) profile.contactInfo.phone.unclass = req.body.contactInfo.phone.unclass

  // Skills
  if(typeof req.body.skills !== 'undefined'){
    profileFields.skills = req.body.skills.split(',');
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const errors = {}
      if(profile) {
        // Update
        Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true})
          .then(profile => res.json(profile))
          .catch(err => res.status(404).json(err))
      } else {
        // Create

        // Check to see if email exists
        Profile.findOne({email: profileFields.contactInfo.email})
          .then(profile => {
            if(profile){
              errors.email = 'Email already exists'
              res.status(400).json(errors)
            }

            new Profile(profileFields).save()
              .then(profile => res.json(profile))
          })
      }
    })
})

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route   POST api/profile/
// @desc    Create user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {}
  
  Profile.findOne({user: req.user.id})
    .then(profile => {
      if(!profile){
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch(err => res.status(404).json(err));
})

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;