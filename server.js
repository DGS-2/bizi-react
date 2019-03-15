const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

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
app.use("/users", require('./routes/api/users'));
app.use("/tasks", require('./routes/api/tasks'));
app.use("/profile", require('./routes/api/profile'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`)
})