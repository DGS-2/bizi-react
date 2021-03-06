#!/usr/bin/env node

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users')
const tasks = require('./routes/api/tasks')
const profile = require('./routes/api/profile')
const teams = require('./routes/api/teams')

const http = require('http');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').connection;

// Connect to database
mongoose
  .connect(db)
  .then( () => console.log( 'Connected to database' ) )
  .catch( err => console.log( err ) )

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// API routes 
app.use("/users", users);
app.use("/tasks", tasks);
app.use("/profile", profile);
app.use("/teams", teams);

// Server static assets if in production

// Set static folder
app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = 5000;

const server = http.createServer(app)

server.listen(port, () => console.log(`Listening on PORT: ${port}`))