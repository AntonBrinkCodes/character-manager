// api/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const app = express();

const uri = process.env.MONGODB_URI;
const secret = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(uri, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Example route
app.get('/api/hello', (req, res) => {
  res.send('Hello from serverless function!');
});

// Export the app as a handler for Vercel
module.exports = (req, res) => app(req, res);
