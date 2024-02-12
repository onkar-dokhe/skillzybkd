// Import the UserModel schema
const UserModel = require('../models/user');

// Function to add a new user to the database
const addUser = async (data) => {
    try {
        // Create a new user using the UserModel schema
        const createdUser = await UserModel.create(data);

        // Extract the user data as a plain JavaScript object, excluding the password field
        const newUser = createdUser?.toJSON();
        delete newUser?.password;

        return newUser;
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to find a single user based on the provided query, excluding the password field
const findUser = async (query) => {
    try {
        // Find a single user that matches the provided query, excluding the password field
        return await UserModel.findOne(query).select('-password').lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to find a single user (including the password field) based on the provided query
const findUserWithPassword = async (query) => {
    try {
        // Find a single user that matches the provided query, including the password field
        return await UserModel.findOne(query).lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Function to update a user based on the provided query and data, excluding the password field
const updateUser = async (query, data) => {
    try {
        // Find and update the user that matches the provided query, excluding the password field
        return await UserModel.findOneAndUpdate(query, { $set: data }, { new: true }).select('-password').lean();
    } catch (error) {
        console.log(error);
        return null; // Return null if an error occurs
    }
}

// Export the user service functions
module.exports = { addUser, findUser, updateUser, findUserWithPassword };
