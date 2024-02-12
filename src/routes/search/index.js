const express = require('express');
const router = express.Router();

const searchController = require('../../controllers/search/index');
const { interviewerAuthentication } = require('../../middlewares/authenticate');

router.get('/interviewees', interviewerAuthentication, searchController.getInterviewees);

module.exports = router;