const foodModel = require('../models/food.model')
// const userModel = require('../models/user.model')
// const storageServices = require('../services/storage.service')
const storageServices = require('../services/storage.service');
const likeModel = require('../models/likes.model')
const { v4:uuid } = require('uuid')
const saveModel = require('../models/save.model')


async function createFood(req, res) {
    try {
        console.log(req.foodPartner);
        console.log(req.body);
        console.log(req.files);

        const videoFile = req.files?.video?.[0];
        const thumbnailFile = req.files?.thumbnail?.[0];

        if (!videoFile) {
            return res.status(400).json({ message: 'Video file is required' });
        }

        // Upload video
        const videoUploadResult = await storageServices.uploadFileToImageKit(videoFile.buffer, uuid());
        console.log(videoUploadResult);

        // Upload thumbnail if provided
        let thumbnailUploadResult = null;
        if (thumbnailFile) {
            thumbnailUploadResult = await storageServices.uploadFileToImageKit(thumbnailFile.buffer, uuid());
            console.log(thumbnailUploadResult);
        }

        // Create food item in DB (assuming foodModel has fields for name, description, videoUrl, thumbnailUrl, etc.)
        const newFood = new foodModel({
            name: req.body.name,
            description: req.body.description,
            videoUrl: videoUploadResult.url, // adjust based on your storage service response
            thumbnailUrl: thumbnailUploadResult?.url || null,
            // add other fields like foodPartner: req.foodPartner._id
        });
        await newFood.save();

        res.status(201).json({ message: "Food item created successfully", food: newFood });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating food item", error: error.message });
    }
}

// const fileUploadResult = await storageServices.uploadFile(req.file.buffer,uuid())
// console.log(fileUploadResult);

async function getFoodItems(req, res) {
    try {
        const foodItems = await foodModel.find({})
        res.status(200).json({
            message: "Food Items fetched Successfully",
            foodItems
        })
    } catch (error) {
        res.status(500).json({ message: "Error fetching food items", error: error.message });
    }
}

async function likeFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        const isAlreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId
        })
        if (isAlreadyLiked) {
            await likeModel.findOneAndDelete({
                user: user._id,
                food: foodId
            })

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            })
            return res.status(200).json({
                message: "Food unliked successfully",
                like: false,
            })
        }

        const like = new likeModel({
            user: user._id,
            food: foodId
        })
        await like.save();

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        })

        res.status(200).json({
            message: "Food liked successfully",
            like: true,
        })
    } catch (error) {
        res.status(500).json({ message: "Error liking food", error: error.message });
    }
}


async function saveFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        const isAlreadySaved = await saveModel.findOne({
            user: user._id,
            food: foodId
        })
        if (isAlreadySaved) {
            await saveModel.findOneAndDelete({
                user: user._id,
                food: foodId
            })

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { saveCount: -1 }
            })
            return res.status(200).json({
                message: "Food unsaved successfully",
                save: false,
            })
        }

        const save = new saveModel({
            user: user._id,
            food: foodId
        })
        await save.save();

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { saveCount: 1 }
        })

        res.status(200).json({
            message: "Food saved successfully",
            save: true,
        })
    } catch (error) {
        res.status(500).json({ message: "Error saving food", error: error.message });
    }
}

async function getSavedFoods(req, res) {
    try {
        const user = req.user;
        const savedFoods = await saveModel.find({ user: user._id }).populate('food');
        if (!savedFoods || savedFoods.length === 0) {
            return res.status(404).json({
                message: "No saved foods found"
            })
        }
        res.status(200).json({
            message: "Saved foods fetched successfully",
            savedFoods
        })
    } catch (error) {
        res.status(500).json({ message: "Error fetching saved foods", error: error.message });
    }
}
module.exports = {
    createFood,
    getFoodItems,
    likeFood,
    saveFood,
    getSavedFoods
}