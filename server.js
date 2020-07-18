const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const Port = process.env.Port || 3000;
const app = express;

//define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//define API routes here
app.use(routes);

//connect Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true
});

app.listen(PORT, () => {
  console.log(` ==> Connected on port ${PORT}!`);
});
