/*
  Express Router Configuration for User Account Routes.

  - Defines routes for retrieving user information, updating user account, and changing password.
  - User authentication middleware is applied to protect the routes.
  - Routes are handled by the corresponding controller methods.

  @module Router
*/

const express = require('express');
const router = express.Router();

// Import user account controller and user authentication middleware
const userAccountController = require('../../controllers/user/account');
const { userAuthentication } = require('../../middlewares/authenticate');

// Define routes and associate with controller methods
router.get('', userAuthentication, userAccountController.me);
router.patch('', userAuthentication, userAccountController.update);
router.patch('/change-password', userAuthentication, userAccountController.changePassword);

// Export the user account router
module.exports = router;
