const express = require('express');
const router = express.Router();

const trendingController = require('../../controllers/trending/index');
const { userAuthentication } = require('../../middlewares/authenticate');

router.get('/trending', userAuthentication, trendingController.getTrendingTopic);

module.exports = router;