const express = require('express');
const router = express.Router();

const challengeController = require('../../controllers/challenge/index');
const { userAuthentication } = require('../../middlewares/authenticate');

router.post('/challenge', userAuthentication, challengeController.createChallenge);
router.get('/challenges', userAuthentication, challengeController.getChallenges)
router.get('/challenge/:id', userAuthentication, challengeController.getChallenge)

module.exports = router;