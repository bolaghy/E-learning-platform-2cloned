const crypto = require('crypto');
const User = require('../Models/authModel'); // Your User model
const ResetToken = require('../Models/resetTokenModel'); // ResetToken model
const { sendPasswordResetEmail } = require('../helpers/sendmail'); // Email helper

// Request password reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Save the reset token to the database
    await ResetToken.create({
      userId: user._id,
      token: resetToken,
    });
 
    // Send the reset email
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(email, resetLink, resetToken);

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};  

// Reset password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find the reset token
    const resetToken = await ResetToken.findOne({ token });
    if (!resetToken) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    // Find the user associated with the token
    const user = await User.findById(resetToken.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    // Delete the reset token
    await ResetToken.deleteOne({ token });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { requestPasswordReset, resetPassword };
