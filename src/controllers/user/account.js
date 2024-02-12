/*
  User Account Controller

  - Provides functions for retrieving user information, updating user details, and changing passwords.
  - Uses user service functions for database interactions.
  - Implements validation for account information and password change.
  - Handles different scenarios, such as validation errors, password matching, and database update failures.

  @module User Account Controller
*/

// Import necessary modules and configurations
const {
    findUser, findUserWithPassword, updateUser,
  } = require('../../services/user');
  const { hashValue, compareHash } = require('../../utils/auth');
  const { accountInfoValidation } = require('../../validations/user');
  const { changePasswordValidation } = require('../../validations/common');
  
  // Function to retrieve user information
  async function me(req, res) {
    const user = await findUser({ _id: req.user?._id });
    return res.status(201).json({ success: true, data: user });
  }
  
  // Function to update user details
  async function update(req, res) {
    try {
      // Validate customer account information
      const validation = accountInfoValidation(req.body);
      if (validation.error) {
        return res.status(422).json({ success: false, message: validation.error.details[0].message });
      }
  
      // Update user information in the database
      const user = await updateUser({ _id: req.user?._id }, req.body);
      if (!user) {
        return res.status(400).json({ success: false, message: 'Failed to update user information' });
      }
  
      return res.json({ success: true, data: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
    }
  }
  
  // Function to change user password
  async function changePassword(req, res) {
    try {
      // Validate password change information
      const validation = changePasswordValidation(req.body);
      if (validation.error) {
        return res.status(422).json({ success: false, message: validation.error.details[0].message });
      }
  
      // Find user with password for comparison
      const user = await findUserWithPassword({ _id: req.user?._id });
      const passwordMatch = await compareHash(req.body.currentPassword, user.password);
  
      // Check if the current password matches
      if (!passwordMatch) {
        return res.status(422).json({ success: false, message: 'Current password does not match' });
      }
  
      // Hash the new password and update user in the database
      const hashPassword = await hashValue(req.body.newPassword);
      const updatedUser = await updateUser({ _id: req.user?._id }, { password: hashPassword });
  
      // Check if the password update was successful
      if (!updatedUser) {
        return res.status(400).json({ success: false, message: 'Failed to change password' });
      }
  
      return res.json({ success: true, data: { message: 'Password changed'} });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message || 'Something went wrong' });
    }
  }
  
  // Export the me, update, and changePassword functions
  module.exports = { me, update, changePassword };
  