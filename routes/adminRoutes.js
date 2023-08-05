const express = require("express");
const router = express.Router();
const validateTokenHandlerAdmin = require("../middlewares/validateTokenHandlerAdmin");
const roleHandler = require("../middlewares/roleHandler");
const { signupAdmin } = require("../controllers/adminControllers");
const { loginAdmin } = require("../controllers/adminControllers");
const { getSubmission } = require("../controllers/adminControllers");
const { postSubmission } = require("../controllers/adminControllers");
const { getAllQuestions } = require("../controllers/adminControllers");
const { getQuestion } = require("../controllers/adminControllers");
const { postQuestion } = require("../controllers/adminControllers");
router.route(
	"/signup"
).post(
	signupAdmin
);
router.route(
	"/login"
).post(
	loginAdmin
);
router.route(
	"/submissions/get/:id"
).get(
	validateTokenHandlerAdmin,
	getSubmission
);
router.route(
	"/submissions/post"
).post(
	validateTokenHandlerAdmin,
	postSubmission
);
router.route(
	"/questions/get"
).get(
	validateTokenHandlerAdmin,
	getAllQuestions
);
router.route(
	"/questions/get/:id"
).get(
	validateTokenHandlerAdmin,
	getQuestion
);
router.route(
	"/questions/post"
).post(
	validateTokenHandlerAdmin,
	roleHandler,
	postQuestion
);
module.exports = router;