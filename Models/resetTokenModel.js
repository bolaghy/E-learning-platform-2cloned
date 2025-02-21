const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to the User model
  },
  token: {
    type: String,
    required: true,
  },
  
},{timestamps: true, expires: 3600 });



module.exports = mongoose.model('ResetToken', resetTokenSchema);