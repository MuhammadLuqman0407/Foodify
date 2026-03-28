const express = require('express');
const foodPartnerController = require('../controllers/food-partner.controller');
const authMiddleware = require('../middlewares/auth.middleware')
const route = express.Router();


route.get("/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPatnerById
)

module.exports = router;