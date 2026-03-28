const foodPartnerModel = require('../models/foodpartner.model')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken'); 

async function authFoodPartnerMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Please Login first"
        })
    }
    // if token in the cookies get then verify the token is same as the jwtsecret.
    // if the token is valid then move to the decoded object...

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findById(decoded.id)
        // if the token is valid then move to the decoded obj and then find by id and then foodPartner is not in the foodPartner model its send to the next api to all the information
        req.foodPartner = foodPartner
        next()

    }
    catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}


async function authUserMiddleware(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Please Login first"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        req.user = user
        next()
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}