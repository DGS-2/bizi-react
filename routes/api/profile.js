const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Mongoose Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const OrganizationUser = require('../../models/OrganizationUser');
const Organization = require('../../models/Organization');
const OrganizationStructure = require('../../models/OrganizationStructure');

const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile/
// @desc    Get current or edit user profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'email'])
    .populate('permission', ['role_name', 'role_level'])
    .populate('rank', ['full', 'abreviated'])
    .populate('organization')
    .exec((err, data) => {
      OrganizationUser.populate(data, {
        path: 'organization.organization'
      }).then(u => {
        res.json(u);
      });
    });
})

router.post('/update-details', passport.authenticate('jwt', {session: false}), (req, res) => {  
  Profile.findOne({user: req.user.id}).then(() => {
    let details = {
      personalInfo: {
        name: {
          full: req.body.name,
          first: req.body.firstName,
          last: req.body.lastName
        }
      },
      contactInfo: {
        email: { unclass: req.body.email },
        phone: { unclass: req.body.phone }
      }
    };
    Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: details },
      { new: true }
    ).then(profile => res.json(profile));
  })
})

router.post('/update-personal-skills', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    let details = {
      skills: req.body
    };

    Profile.findOneAndUpdate(
      {user: req.user.id},
      {$set: details},
      {new: true}
    ).then(profile => res.json(profile));
  })
})

router.post('/update-organizational-details', passport.authenticate('jwt', {session: false}), (req, res) => {  
  const errors = {};
  /**
   * Check to see if "org" is already in OrganizationUser
   * if not, remove object.level === 'squadron'
   * change -- $push -- org into organization array
   */
  
  OrganizationUser.findOne({ user: req.user.id }).then(user => {
    if(user.organization.includes(req.body.org)) console.log('Squadron Found');
    else {
      Organization.find({_id: {$in: user.organization }}).then(found => {
        let squadronToRemove = found.filter(item => item.level === 'squadron')[0];
        OrganizationUser.findOneAndUpdate(
          {user: req.user.id},
          {$pull : { 'user.organization' : squadronToRemove }}
        );
      });
    }

    Organization.findOne({name: req.body.flight}).then(flight => {
      if(!flight || flight === null){
        const newFlight = new Organization({
          name: req.body.flight,
          abreviated: req.body.office,
          level: 'flight'
        });

        newFlight.save().then(newFlight => {
          new OrganizationStructure({
            parent_id: req.body.org,
            child_id: newFlight._id
          }).save().then(newRelationsip => {
            OrganizationUser.findOneAndUpdate(
              { user: req.user.id},
              { $push: { 'organization': newRelationsip.child_id } },
              { new: true }
            ).then(() => {
              Profile.findOne({ user: req.user.id })
                .populate('user', ['name', 'email'])
                .populate('permission', ['role_name', 'role_level'])
                .populate('rank', ['full', 'abreviated'])
                .populate('organization')
                .exec((err, data) => {
                  OrganizationUser.populate(data, {
                    path: 'organization.organization'
                  }).then(u => {
                    res.json(u);
                  });
                });
            }).catch(err => console.log(err));
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      }
    });
  });
})

// @route   POST api/profile
// @desc    Create or edit user profile 
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;

  profileFields.organization = {}
  if(req.body.organization.wing) profileFields.organization.wing = req.body.organization.wing
  if(req.body.organization.group) profileFields.organization.group = req.body.organization.group
  if(req.body.organization.squadron) profileFields.organization.squadron = req.body.organization.squadron
  if(req.body.organization.flight) profileFields.organization.flight = req.body.organization.flight
  // // Gather personal data
  profileFields.personalInfo = {}
  profileFields.personalInfo.name = {}
  if(req.body.personalInfo.name.full) profileFields.personalInfo.name.full = req.body.personalInfo.name.full
  if(req.body.personalInfo.name.first) profileFields.personalInfo.name.first = req.body.personalInfo.name.first
  if(req.body.personalInfo.name.last) profileFields.personalInfo.name.last = req.body.personalInfo.name.last

  profileFields.personalInfo.rank = {}
  if(req.body.personalInfo.rank.full) profileFields.personalInfo.rank.full = req.body.personalInfo.rank.full
  if(req.body.personalInfo.rank.abreviated) profileFields.personalInfo.rank.abreviated = req.body.personalInfo.rank.abreviated
  
  // // Contact
  profileFields.contactInfo = {}
  profileFields.contactInfo.email = {}
  if(req.body.contactInfo.email.unclass) profileFields.contactInfo.email.unclass = req.body.contactInfo.email.unclass

  profileFields.contactInfo.phone = {}
  if(req.body.contactInfo.phone.unclass) profileFields.contactInfo.phone.unclass = req.body.contactInfo.phone.unclass

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create

      // Check if handle exists
      Profile.findOne({ handle: profileFields.contactInfo.email }).then(profile => {
        if (profile) {
          errors.email = 'That email already exists';
          res.status(400).json(errors);
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
})

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};
  /**
   * TODO
   * Get all profiles and populate each field
   */
  Profile.find()
  .populate('user', ['name', 'email'])
  .populate('permission', ['role_name', 'role_level'])
  .populate('rank', ['full', 'abreviated'])
  .populate('organization')
  .exec((err, data) => {
    OrganizationUser.populate(data, {
      path: 'organization.organization'
    }).then(u => {
      res.json(u);
    });
  });
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
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