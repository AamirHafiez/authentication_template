const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

// url: localhost:8080/users/sign-up
router.get('/sign-up', usersController.signUp);
// url: localhost:8080/users/sign-in
router.get('/sign-in', usersController.signIn);
// url: localhost:8080/users/create
router.post('/create', usersController.create);
// url: localhost:8000/users/user-present
router.get('/user-present', usersController.userPresent);

module.exports = router;