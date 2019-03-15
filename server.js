const express = require('express');

const mongoose = require('mongoose');

const app = express();

// DB Config
const db = require('./config/keys').connection;

// Connect to database
mongoose
  .connect(db)
  .then( () => console.log( 'Connected to database' ) )
  .catch( err => console.log( err ) )


// API routes 
app.use("/users", require('./routes/api/users'));
app.use("/tasks", require('./routes/api/tasks'));
app.use("/profile", require('./routes/api/profile'));

app.get('/', (rea,res) => res.send('hello, dawg'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`)
})