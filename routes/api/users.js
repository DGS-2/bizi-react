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
const Authentication = require('../../models/Authentication');
const AccessControl = require('../../models/AccessControl');
const SecurityRole = require('../../models/SecurityRole');
const Rank = require('../../models/Rank');
const Organization = require('../../models/Organization');
const OrganizationUser = require('../../models/OrganizationUser');
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
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      }
      // Populate User model
      const newUser = new User({
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        isToken: req.body.isToken
      });

      // Create new user
      newUser.save().then(user => {
        Authentication.findOne({email: req.body.email}).then(record => {
          if(record) {
            errors.record = `Record already exists for email: ${email}`;
            res.status(400).json(errors);
          }
          // Create new authentication object
          const auth = new Authentication({
            email: user.email,
            password: req.body.password
          });

          // Salt password and save
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(auth.password, salt, (err, hash) => {
              if(err) throw err;
              auth.password = hash;
              auth.save()
            })
          });
        });
        

        // Set user to Basic User
        SecurityRole.findOne({role_name: "Basic User"}).then(role => {
          const accessControl = new AccessControl({
            user: user._id,
            security_role: role._id
          });

          accessControl.save().then(control => {
            Profile.findOne({user: user._id}).then(profile => {
              if(profile) {
                errors.profile = `Profile already exists for user: ${user._id}`;
                res.status(404).json(errors);
              }
              OrganizationUser.findOne({user: user._id}).then(orgU => {
                if(!orgU) {
                  Organization.findOne({"abreviated": "480th ISRW"}).then(org => {
                    new OrganizationUser({
                      user: user._id
                    }).save()
                      .then(() => {
                        OrganizationUser.findOneAndUpdate({user: user._id},{$push: {organization: org._id}}, {new: true})
                          .then(orgUser => {
                            Rank.findOne({abreviated: req.body.rank}).then(rank => {
                              const newProfile = new Profile({
                                user: user._id,
                                rank: rank._id,
                                permission: role._id,
                                organization: orgUser._id
                              });          
                              newProfile.save();
                            })
                          }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                    })
                    
                }
              }).catch(err => console.log(err));          
            }).catch(err => console.log(err));
            
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      }).then(user => res.json(user)).catch(err => console.log(err));
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
  Authentication.findOne({ email: email })
    .then( auth => {
      if(!auth) {
        errors.email = "Record not found"
        return res.status(404).json(errors)
      }

      // Check password
      bcrypt.compare( password, auth.password )
        .then( isMatch => {
          if(isMatch) {
            // User matched
            User.findOne({email: auth.email}).then(user => {
              const payload = { id: user.id, name: user.name, isToken: user.isToken } // Create JWT payload
              // Sign token
              // @payload   JWT details
              // @secret    secret key for validation
              // @expire    Token time of life
              jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token)  => {
                res.json({success: true, token: `Bearer ${token}`})
              });
            }).catch(err => console.log(err));
            
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