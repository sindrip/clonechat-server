const express = require('express');
const router = express.Router();

const authController = require('./authController');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Authenticated routes, require a user to be logged in


module.exports = router;