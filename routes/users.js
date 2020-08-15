const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

// url: localhost:8080/users/sign-up
router.get('/sign-up', passport.notAuthenticated, usersController.signUp);
// url: localhost:8080/users/sign-in
router.get('/sign-in', passport.notAuthenticated, usersController.signIn);
// url: localhost:8080/users/create
router.post('/create', usersController.create);
// url: localhost:8000/users/user-present
router.get('/user-present', usersController.userPresent);
// url: localhost:8080/users/create-session
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/sign-in'
}), usersController.createSession);
// url: localhost:8080/users/destroy-session
router.get('/destroy-session', passport.checkAuthentication, usersController.destroySession);

module.exports = router;