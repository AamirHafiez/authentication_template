const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');

// render sign up page
module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title: 'Authentication | Sign Up',
    });
}

// render sign in page
module.exports.signIn = function(req, res){   
    return res.render('sign_in', {
        title: 'Authentication | Sign In'
    });
}

//render user present
module.exports.userPresent = function(req, res){
    return res.render('user_present', {
        title: 'Authentication | OOPS!'
    });
}

// render forget password page
module.exports.forget = function(req, res){
    res.render('forget_password', {
        title: 'Authentication | Forget'
    });
}

//render change password page
module.exports.changePass = function(req, res){
    res.render('change_password', {
        title: 'Authentication | Change Password',
    });
}

// create user in database (SignUp)
module.exports.create = function(req, res){
    // to check password and verify password
    if(req.body.password != req.body.verify_password){
        req.flash('error','Password and Verify Password do not Match');
        return res.redirect('back');
    }

    // for checking password validation
    function containsNumber(t){
        return /\d/g.test(t);
    }
    if(req.body.password.length < 8 || !containsNumber(req.body.password)){
        req.flash('error', 'Check: If password atleast of length 8 and has a number');
        return res.redirect('back');
    }
    
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            req.flash('error', err);
            console.log('Error in finding user');
            return;
        }
        if(user){ //user present
            req.flash('error', 'Account already exists!!'); 
            return res.redirect('back');
        }else{  //user not present
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                req.body.password = hash;
                User.create(req.body, function(err, user){
                    if(err){
                        console.log('Error in creating user');
                        return;
                    }
                    req.flash('success','Account created Successfully!!');
                    return res.redirect('/users/sign-in');
                });    
            });
        }
    });
}

// create session (Sign in)
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

// destroy session (Signout)
module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}

// send reset email
module.exports.resetMail = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user --> reset mail');
            return;
        }
        if(!user){
            req.flash('error', 'No user found');
            return res.redirect('back');
        }else{
            // generating a random alpha numeric string of length 12
            let tempPass = randomstring.generate({
                length: 12,
                charset: 'alphanumeric'
            });

            bcrypt.hash(tempPass, 10, function(err, hash){
                User.findByIdAndUpdate(user.id, {password: hash}, function(err, user){
                    if(err){
                        console.log('Error in finding user');
                        return;
                    }
                });
            });
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    //TODO: Add email and password in user and password field respectively
                    user: 'youremail@gmail.com',
                    pass: 'yourpassword'
                }
            });
            let mailOptions = {
                from: 'youremail@gmail.com',
                to: req.body.email,
                subject: 'Password Reset',
                text: 'Hey, Here is your temporary Password!! Do not share with anyone: ' + tempPass
            };
                
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            return res.redirect('/users/sign-in');
        }
    });
}

// change password sucessfull
module.exports.changePassSucess = function(req, res){
    // to check password and verify password
    if(req.body.password != req.body.verify_password){
        req.flash('error','Password and Verify Password do not Match');
        return res.redirect('back');
    }

    // for checking password validation
    function containsNumber(t){
        return /\d/g.test(t);
    }
    if(req.body.password.length < 8 || !containsNumber(req.body.password)){
        req.flash('error', 'Check: If password atleast of length 8 and has a number');
        return res.redirect('back');
    }

    bcrypt.hash(req.body.password, 10, function(err, hash){
        User.findByIdAndUpdate(req.user.id, {password: hash}, function(err, user){
            if(err){
                console.log('Error in finding and updating user password');
                return;
            }
            req.flash('success', 'Password changed Successfully');
            return res.redirect('back');
        });
    });
    
}