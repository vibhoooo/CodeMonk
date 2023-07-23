const express = require("express");
const router = express.Router();
const validateTokenHandlerUser = require("../middlewares/validateTokenHandlerUser");
const { signupUser } = require("../controllers/userControllers");
const { loginUser } = require("../controllers/userControllers");
const { getSubmission } = require("../controllers/userControllers");
const { postSubmission } = require("../controllers/userControllers");
const { getAllQuestions } = require("../controllers/userControllers");
const { getQuestion } = require("../controllers/userControllers");
router.route(
	"/signup"
).post(
	signupUser
);
router.route(
	"/login"
).post(
	validateTokenHandlerUser,
	loginUser
);
router.route(
	"/submissions/get/:id"
).get(
	validateTokenHandlerUser,
	getSubmission
);
router.route(
	"/submissions/post"
).post(
	validateTokenHandlerUser,
	postSubmission
);
router.route(
	"/questions/get"
).get(
	validateTokenHandlerUser,
	getAllQuestions
);
router.route(
	"/questions/get/:id"
).get(
	validateTokenHandlerUser,
	getQuestion
);
module.exports = router;