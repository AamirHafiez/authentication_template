const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

// render sign up
router.get('/sign-up', passport.notAuthenticated, usersController.signUp);
// render sign in
router.get('/sign-in', passport.notAuthenticated, usersController.signIn);
// sign up functionality
router.post('/create', usersController.create);
// sign in functionality
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: '/users/sign-in'
}), usersController.createSession);
// sign out functionality
router.get('/destroy-session', passport.checkAuthentication, usersController.destroySession);
// render forget page
router.get('/forget', passport.notAuthenticated, usersController.forget);
// send reset mail functionality
router.post('/send-reset', passport.notAuthenticated, usersController.resetMail);
// render change password
router.get('/change-password', passport.setAuthenticatedUser, passport.checkAuthentication,usersController.changePass);
// change password functionality
router.post('/change-password/success', passport.checkAuthentication, usersController.changePassSucess);

// google sign in and sign up
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'} ), usersController.createSession);

module.exports = router;