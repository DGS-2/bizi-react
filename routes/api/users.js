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

  User.findOne( { unclass_email: req.body.email } )
    .then( user => {
      if(user) {
        errors.email = "Email already exists"

        return res.status(400).json(errors);
      }
      const newUser = new User({
        name: req.body.name,
        unclass_email: req.body.unclass_email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then( user => res.json(user) )
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

  const email = req.body.unclass_email
  const password = req.body.password

  // Find user by email
  User.findOne({ unclass_email: email })
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

            const payload = { id: user.id, name: user.name } // Create JWT payload
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
    })
})

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