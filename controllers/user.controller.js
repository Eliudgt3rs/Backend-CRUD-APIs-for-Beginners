
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
            message: "User Created Successfully",
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
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

    //Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            message: "User Logged in Successfully",
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

//Get User Profile
//route GET /api/users/me
//access public
const getUser = asyncHandler( async(req, res) => {
    res.status(201).json({ message: "User Data Retrieved Successfully" });
});

//Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

//deleteUser
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // ✅ Validate ID before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json(error.message );
    }
});

module.exports = {
    createUser,
    loginUser,
    getUser,
    deleteUser
};