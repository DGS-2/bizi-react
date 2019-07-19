const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');


// Models
const Organization = require('../../models/Organization');
const OrganizationStructure = require('../../models/OrganizationStructure');
const OrganizationUser = require('../../models/OrganizationUser');


router.get('/squadrons', (req, res) => {
    Organization.find({level: "squadron"}).then(squadrons => res.json(squadrons)).catch(err => res.status(404).json({error: err}));
});

module.exports = router;