const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Import Google Auth Strategy and API Routes
require('../auth/googleAuth');
const authRoutes = require('../routes/authRoutes');
const characterRoutes = require('../routes/characterRoutes');

const app = express();

const uri = process.env.MONGODB_URI;
const secret = process.env.SECRET_KEY;

// Middleware
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

// Connect to MongoDB using Mongoose
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 30000
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/characters', characterRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start server only if running locally
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for use in Vercel
module.exports = app;
