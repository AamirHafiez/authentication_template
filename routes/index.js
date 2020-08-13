const express = require('express');
const router = express.Router();

// homeController required
const homeController = require('../controllers/home_controller');

console.log('WOW!! Router is loaded');

// url: localhost:8080/users
router.use('/users', require('./users'));

// home function called for url : localhost:8080
router.get('/', homeController.home);

module.exports = router;