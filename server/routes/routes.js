const express = require('express');
const router = express.Router();

const authController = require('./authController');
const userController = require('./userController');
const imageController = require('./imageController');
const messageController = require('./messageController');

const {authenticate} = require('./../middleware/authenticate');
const {upload} = require('./../middleware/multerUpload');

// are we up yet?
router.get('/', (req, res) => res.send('Docker Hub test!'));

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Authenticated routes, require a user to be logged in
router.delete('/logout', authenticate, authController.logout);
router.get('/testlogin', authenticate, (req, res) => res.send('User is logged in'));

router.post('/users/me/friends', authenticate, userController.addFriend);
router.get('/users/me/friends', authenticate, userController.getFriends);
router.delete('/users/me/friends', authenticate, userController.deleteFriend);
router.get('/users', authenticate, userController.searchForUsername);

router.post('/images', authenticate, upload.single('image'), imageController.upload);
router.get('/images/:id', authenticate, imageController.getSignedUrl);

router.post('/messages', authenticate, messageController.sendMessage);
router.get('/messages', authenticate, messageController.getMyMessages);
router.delete('/messages', authenticate, messageController.deleteMessage);

module.exports = router;