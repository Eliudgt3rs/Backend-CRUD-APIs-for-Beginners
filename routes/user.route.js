const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const { createUser,loginUser,getUser, deleteUser } = require("../controllers/user.controller.js");


const app = express();
app.use(express.json());

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/me", getUser);
router.delete("/:id", deleteUser);

module.exports = router;