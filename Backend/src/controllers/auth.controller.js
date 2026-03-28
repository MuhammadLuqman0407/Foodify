const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// created the authentication system for the user 
async function registerUser(req,res){
    const {fullname,email,password} = req.body;

    // check the user is exits with the same email, if exits and then reject
    const existingUser = await userModel.findOne({email});

    if(existingUser){
        return res.status(400).json({message:"User is already exits with the same email, Please login"});
    }
    // create the hashed 
    const hashedPassword = await bcrypt.hash(password,10);
    // create the new user'
    const user = await userModel.create({
        fullname,
        email,
        password:hashedPassword,
    });
    //we create the token for the saving the user id in the token, we required the jsonwebtoken package
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)

    // the token is saved in the cookie, SO we required the cookie-parser package
    // user the cookie-parser middleware to save the token in the cookie
    res.cookie("token",token)

    res.status(201).json({
        message: "User registered Successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullname: user.fullname 
        }
    })
}

// controller(callback) for the login
async function loginUser(req,res){
    const {email,password} = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
         return res.status(400).json({
            message: "Invalid email or Password",
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email and Password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message: "User logged in successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    })
}

// logout -> clear the token in the cookies
function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out Successfully"
    });
}

// create the authentication system for the food partner
async function registerFoodPartner(req,res){
    const {name,email,password,phone,address, contactName} = req.body;
    try{

        const isAccountExists = await foodPartnerModel.findOne({
            email
        })
    
        if(isAccountExists){
            return res.status(400).json({
                message: "Food partner account already exists"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password,10);
    
        const foodPartner = await foodPartnerModel.create({
            name,
            email,
            password:hashedPassword,
            phone,
            contactName,
            address
        })
    
        // token generate
        const token = jwt.sign({
            id:foodPartner._id,
        },process.env.JWT_SECRET)
    
        res.cookie("token",token);
    
        res.status(201).json({
            message: "Food Partner register Successfully",
            foodPartner:{
                _id: foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
                phone: foodPartner.phone,
                contactName: foodPartner.contactName,
                address: foodPartner.address
            }
        })
    }catch(err){
        console.error("Error registering food partner:", err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function loginFoodPartner(req,res){
    const {email, password} = req.body;

    const foodPartnerExits = await foodPartnerModel.findOne({
        email
    })
    if(!foodPartnerExits){
        return res.status(400).json({
            message:"Invalid email or Password",
        })
    }

    const isPasswordValid = await bcrypt.compare(password,foodPartnerExits.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or Password"
        })
    }

    const token = jwt.sign({
        id: foodPartnerExits._id,
    }, process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(200).json({
        message:"Food partner Login Successfully",
        foodPartner:{
            _id: foodPartnerExits._id,
            name: foodPartnerExits.name,
            email: foodPartnerExits.email 
        }

    })
}

function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "Food Partner logged out Successfully"
    });
} 

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}