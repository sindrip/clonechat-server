const express = require('express');
const router = express.Router();

const authController = require('./authController');
const {authenticate} = require('./../middleware/authenticate');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Authenticated routes, require a user to be logged in
router.get('/testlogin', authenticate, (req, res) => res.send('User is logged in'));


module.exports = router;