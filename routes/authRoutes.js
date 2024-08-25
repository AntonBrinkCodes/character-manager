const express = require('express');
const passport = require('passport');

const router = express.Router();

const frontendURL = process.env.REACT_APP_FRONTEND_URL;


// Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect(`${frontendURL}/create`);  // Redirect to frontend dashboard
});

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
