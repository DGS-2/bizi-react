const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');

const Skill = require('../../models/Skill');

//
//
//
router.get('/all', (req, res) => {
  Skill.find()
    .then(skills => res.json(skills))
    .catch(err => res.status(404).json({noskillsfound: "There were no skills found"}))
})

module.exports = router;