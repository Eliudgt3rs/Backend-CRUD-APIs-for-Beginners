const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model.js");

//Create User
//route POST /api/user
//access public
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //Validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    //Check if user email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("Email has already been registered");
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

});

//Authenticate User
//route POST /api/user/login
//access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //Validate Request
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add email and password");
    }
    //Check for user email
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({ message: "User Logged in Successfully" });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }

  res.status(201).json({ message: "User Logged in Successfully" });     
});

//Get User Profile
//route GET /api/users/me
//access public
const getUser = asyncHandler( async(req, res) => {
    res.status(201).json({ message: "User Data Retrieved Successfully" });
});


module.exports = {
    createUser,
    loginUser,
    getUser
};