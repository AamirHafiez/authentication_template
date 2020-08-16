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
// url: localhost:8080/users/user-present
router.get('/user-present', usersController.userPresent);
// url: localhost:8080/users/create-session
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/sign-in'
}), usersController.createSession);
// url: localhost:8080/users/destroy-session
router.get('/destroy-session', passport.checkAuthentication, usersController.destroySession);
// url: localhost:8080/users/forget
router.get('/forget', passport.notAuthenticated, usersController.forget);
// url: localhost:8080/users/send-reset
router.post('/send-reset', passport.notAuthenticated, usersController.resetMail);
// url: localhost:8080/users/change-password
router.get('/change-password', passport.setAuthenticatedUser, passport.checkAuthentication,usersController.changePass);
// url: localhost:8080/users/change-password/success
router.post('/change-password/success', passport.checkAuthentication, usersController.changePassSucess);

// google sign in and sign up
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'} ), usersController.createSession);

module.exports = router;