const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require("../../models/User");
const Profile = require('../../models/Profile');
// @route GET api/users/
// @desc 
// @access public
router.get('/', (req, res) => res.json({  }))

// @route   POST api/users/register
// @desc    Register a new user
// @access  public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne( { email: req.body.email } )
    .then( user => {
      if(user) {
        errors.email = "Email already exists"

        return res.status(400).json(errors);
      }
      const newUser = new User({
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isToken: req.body.isToken
      });
      
      const newProfile = new Profile({
        organization: {
          wing: '',
          group: '',
          squadron: '',
          flight: '',
          team: '',
          office: ''
        },
        personalInfo: {
          name: {
            full: req.body.name,
            first: req.body.firstName,
            last: req.body.lastName
          },
          rank: {
            full: req.body.rank.label,
            abreviated: req.body.rank.value
          },
          privilege: {
            title: '',
            level: 1
          },
          tags: [],
          teams: [{
            teamId: ''
          }],
          invitations: [{
            teamId: '',
            accepted: false
          }],
          bio: '',
          education: {
            military: [{
              year: '',
              school: {
                name: '',
                unit: '',
                location: {
                  base: '',
                  state: ''
                },
                joint: false
              }
            }],
            professional: [{
              year: '',
              award: '', // Degree or Certificate
              school: {
                name: '',
                state: ''
              }
            }]
          },
          assignments: [{
            from: '',
            to: '',
            position: '',
            squadron: '',
            location: '',
            joint: false
          }]
        },
        contactInfo: {
          email: {
            unclass: req.body.email
          },
          phone: {
            unclass: ''
          }
        },
        skills: [{
          name: ''
        }]
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then( user => {
              newProfile.user = user._id;

              newProfile.save().then((user, profile) => {
                res.json(user)
              })
            })
            .catch(err => console.log(err))
        })
      })
    }) 
})

// @route   POST api/users/login
// @desc    Login registered user
// @access  public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if(!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

  // Find user by email
  User.findOne({ email: email })
    .then( user => {
      if(!user) {
        errors.email = "User not found"
        return res.status(404).json(errors)
      }

      // Check password
      bcrypt.compare( password, user.password )
        .then( isMatch => {
          if(isMatch) {
            // User matched

            const payload = { id: user.id, name: user.name, isToken: user.isToken } // Create JWT payload
            // Sign token
            // @payload   JWT details
            // @secret    secret key for validation
            // @expire    Token time of life
            jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token)  => {
              res.json({success: true, token: `Bearer ${token}`})
            });
          } else {
            errors.password = "Password incorrect"
            return res.status(400).json(errors)
          }
        })
        .catch( err => console.log(err) )
    });
})

// @route   POST api/users/reset-password
// @desc    Reset registered user password
// @access  private
router.post('/reset-password', passport.authenticate('jwt', {session: false}), (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const id = req.body.id;
  User.findOne({ _id: id })
    .then( user => {
      if(!user) {
        errors.email = "User not found"
        return res.status(404).json(errors)
      }

      // Check password
      bcrypt.compare( currentPassword, user.password )
        .then( isMatch => {
          if(isMatch) {
            // User matched
            // Update password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newPassword, salt, (err, hash) => {
                if(err) throw err;
                  User.findOneAndUpdate(
                    {_id: user._id},
                    { $set: {"password" : hash} }
                  ) 
                  .then( user => res.json(user) )
                  .catch(err => err )
              })
            })
          } else {
            errors.password = "Password incorrect"
            return res.status(400).json(errors);
          }
        })
        .catch( err => err );
    });
});


// @route   GET api/users/current
// @desc    Return current user
// @access  private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) =>{
  res.json({
    id: req.user.id,
    name: req.user.name
  });
})

module.exports = router;