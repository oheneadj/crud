const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
/* 
@desc   Create a user
@route  GET/api/users/register
@access Public
*/
const registerUser = asyncHandler(async (req, res)=>{
    const {name, email, password} = req.body

    if (!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user already exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User alreadt exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    // Check if user is created
    if(user){
        res.status(200).json({
            _id:user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User data')
    }

})
/* 
@desc   Login User
@route  POST /api/users.login
@access Private
*/
const loginUser = asyncHandler(async (req, res)=>{
    const { email, password } = req.body

    //Find user by email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id:user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid login credentials. Please try again')
    }
    }

)
/* 
@desc   Get User Details
@route  GET/api/users/me
@access Private
*/
const userData = asyncHandler(async (req, res)=>{
    res.json({message: 'User Details'})
})

const generateToken = (id)=>{
    return jwt.sign({id}, process.dev.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    userData
}