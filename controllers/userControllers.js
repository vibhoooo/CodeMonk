const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const Submission = require("../models/submissionModels");
const Question = require("../models/questionModels");
// @desc Sign Up
// @route POST /users/signup
// @access public
const signupUser = asyncHandler(
	async (req, res) => {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			res
				.status(
					400
				);
			throw new Error(
				"All fields are mandatory!"
			);
		}
		const userAvailable = await User.findOne(
			{
				email
			}
		);
		if (userAvailable) {
			res
				.status(
					400
				);
			throw new Error(
				"User already registered!"
			);
		}
		const hashedPassword = await bcrypt.hash(
			password,
			10
		);
		const user = await User.create(
			{
				username,
				email,
				password: hashedPassword
			}
		);
		if (user) {
			res
				.status(
					201
				)
				.json(
					{
						id: user.id,
						email: user.email
					}
				);
		}
		else {
			res
				.status(
					500
				);
			throw new Error(
				"Registration falied!"
			);
		}
	}
);
// @desc Login
// @route POST /users/login
// @access public
const loginUser = asyncHandler(
	async (req, res) => {
		const { email, password } = req.body;
		if (!email || !password) {
			res
				.status(
					400
				);
			throw new Error(
				"All fields are mandatory!"
			);
		}
		const user = await User.findOne(
			{
				email
			}
		);
		if (user && (await bcrypt.compare(password, user.password))) {
			const accessToken = jwt.sign(
				{
					user: {
						username: user.username,
						email: user.email,
						id: user.id,
						role: "User"
					}
				},
				process.env.ACCESS_TOKEN_SECRET_USER,
				{
					expiresIn: "30m"
				}
			);
			res
				.status(
					200
				)
				.json(
					{
						accessToken
					}
				);
		}
		else {
			res
				.status(
					401
				);
			throw new Error(
				"Email or Password not valid!"
			);
		}
	}
);
// @desc Get a submission
// @route GET /users/submissions/get/:id
// @access private
const getSubmission = asyncHandler(
	async (req, res) => {

	}
);
// @desc Post a submission
// @route POST /users/submissions/post
// @access private
const postSubmission = asyncHandler(
	async (req, res) => {

	}
);
// @desc Get all questions
// @route GET /users/questions/get
// @access private
const getAllQuestions = asyncHandler(
	async (req, res) => {

	}
);
// @desc Get a question
// @route GET /users/questions/get/:id
// @access private
const getQuestion = asyncHandler(
	async (req, res) => {

	}
);
module.exports = { 
	signupUser,
	loginUser,
	getSubmission,
	postSubmission,
	getAllQuestions,
	getQuestion,
};