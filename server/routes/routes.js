const express = require('express');
const router = express.Router();

const authController = require('./authController');
const {authenticate} = require('./../middleware/authenticate');

// are we up yet?
router.get('/', (req, res) => res.send('Docker Hub test!'));

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Authenticated routes, require a user to be logged in
router.delete('/logout', authenticate, authController.logout);
router.get('/testlogin', authenticate, (req, res) => res.send('User is logged in'));


module.exports = router;