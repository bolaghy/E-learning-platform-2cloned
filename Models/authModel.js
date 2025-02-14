const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const salt =10;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Instructor name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required:[true, "password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    bio: {
        type: String,
        trim: true
    },
    profilePicture: {
        type: String, // URL to profile picture
        default: "https://example.com/default-profile.png"
    },
    role: {
        type: String,
        enum: ["instructor", "student"],
        required: true,
      }, 
   

}, {Timestamp: true})

// hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Compare password method
  userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

module.exports = mongoose.model("User", userSchema)