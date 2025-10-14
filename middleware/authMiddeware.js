const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            //Get token from header
            token = req.headers.authorization.split(" ")[1];
        } catch (error) {
            
        }
    }
})

module.exports = { protect };