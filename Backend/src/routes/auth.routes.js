const express = require('express');
const authController = require("../controllers/auth.controller")

// used the router then require the router
const router = express.Router();


// create the api and use the controller in it that are written in the controller folder 
// user auth apis
router.post('/user/register',authController.registerUser);
router.post('/user/login',authController.loginUser);
router.get('/user/logout',authController.logoutUser);

// food partner apis
router.post('/food-partner/register',authController.registerFoodPartner);
router.post('/food-partner/login',authController.loginFoodPartner);
router.get('/food-partner/logout',authController.logoutFoodPartner);
module.exports = router;