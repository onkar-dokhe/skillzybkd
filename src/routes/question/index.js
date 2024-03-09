
const express = require('express');
const router = express.Router();

const questionController = require('../../controllers/question/index');
const { interviewerAuthentication } = require('../../middlewares/authenticate');

router.post('/question', interviewerAuthentication, questionController.createQuestion);
router.get('/questions/:id', interviewerAuthentication, questionController.getQuestion);
router.get('/questions', interviewerAuthentication, questionController.getAllQuestions);
router.patch('/question/:id', interviewerAuthentication, questionController.updateAQuestion);

module.exports = router;