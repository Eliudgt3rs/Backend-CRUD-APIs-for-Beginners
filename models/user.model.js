const moongoose = require("mongoose");
const UserSchema = new moongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,  
            required: [true, "Email is required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = moongoose.model("User", UserSchema);