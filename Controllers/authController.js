require('dotenv').config()
const User = require('../Models/authModel')
const jwt =require('jsonwebtoken')



// Register a new user (instructor or student)
const register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
  
      // Create new user
      const user = await User.create({ name, email, password, role });
      res.status(201).json({success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ success: false,  error  });  
        console.log(error)
      }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(400).json({ success: false, message: "please provide necessary infomation" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Wrong Email or Password" });
    }

    // Compare passwords
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(400).json({success: false, message: "Wrong Email or Password"});
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, //payload to sign
      process.env.JWT_SECRET, 
      {expiresIn: "1h",});

    res.status(200).json({
      success: true, 
      token, 
      user:{ id: user._id, name: user.name, email: user.email, role: user.role }
       });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = {register, login}