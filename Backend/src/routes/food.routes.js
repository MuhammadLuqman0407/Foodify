const express = require('express');
const foodController = require('../controllers/food.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const multer = require('multer')

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

// POST /api/food
// field names must match client form-data keys (e.g., "video", "thumbnail")
router.post(
  '/',
  authMiddleware.authFoodPartnerMiddleware,
  upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
  foodController.createFood
)

router.get(
  '/',
  authMiddleware.authUserMiddleware,
  foodController.getFoodItems
)

router.post(
  '/like',
  authMiddleware.authUserMiddleware,
  foodController.likeFood
)

router.post(
  '/save',
  authMiddleware.authUserMiddleware,
  foodController.saveFood
)

router.get(
  '/saved',
  authMiddleware.authUserMiddleware,
  foodController.getSavedFoods
)

module.exports = router