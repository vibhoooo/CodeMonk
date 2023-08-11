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
					expiresIn: "60m"
				}
			);
			res
				.status(
					200
				)
				.json(
					{
						accessToken,
						role: "User"
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
// @route POST 
// @access private
const postSubmission = asyncHandler(
	async (req, res) => {

	}
);
// @desc Get all questions
// @route GET /users/questions/get?page=${page}
// @access private
const getAllQuestions = asyncHandler(
	async (req, res) => {
		const problems1 = [
			{
				id: 1,
				title: 'Problem 1',
				category: 'Easy'
			},
			{
				id: 2,
				title: 'Problem 2',
				category: 'Medium'
			},
			{
				id: 3,
				title: 'Problem 3',
				category: 'Hard'
			},
			{
				id: 4,
				title: 'Problem 4',
				category: 'Medium'
			},
			{
				id: 5,
				title: 'Problem 5',
				category: 'Hard'
			}
		];
		const problems2 = [
			{
				id: 6,
				title: 'Problem 1',
				category: 'Easy'
			},
			{
				id: 7,
				title: 'Problem 2',
				category: 'Medium'
			},
			{
				id: 8,
				title: 'Problem 3',
				category: 'Hard'
			},
			{
				id: 9,
				title: 'Problem 4',
				category: 'Medium'
			},
			{
				id: 10,
				title: 'Problem 5',
				category: 'Hard'
			}
		];
		const problems3 = [
			{
				id: 6,
				title: 'Problem 1',
				category: 'Easy'
			},
			{
				id: 7,
				title: 'Problem 2',
				category: 'Medium'
			},
			{
				id: 8,
				title: 'Problem 3',
				category: 'Hard'
			},
			{
				id: 9,
				title: 'Problem 4',
				category: 'Medium'
			},
			{
				id: 10,
				title: 'Problem 5',
				category: 'Hard'
			}
		];
		const allProblems = [...problems1, ...problems2, ...problems3];
		const itemsPerPage = 5;
		const currentPage = req.query.page;
		try {
			const startIndex = (currentPage - 1) * itemsPerPage;
			const endIndex = currentPage * itemsPerPage;
			const problems = allProblems.slice(startIndex, endIndex);
			res
				.status(
					200
				)
				.json(
					{
						currentPage: currentPage,
						totalPages: Math.ceil(allProblems.length / itemsPerPage),
						totalProblems: allProblems.length,
						problems: problems,
					}
				);
		}
		catch(error) {
			res
				.status(
					500
				);
			throw new Error(
				"Internal Server Error!"
			);
		}
	}
);
// @desc Get a question
// @route GET  
// @access private
const getQuestion = asyncHandler(
	async (req, res) => {
		const problem = [
			{
				title: "Problem 1",
				description: "This is description",
				input: "This is sample input",
				output: "This is sample output",
				constraint: "This is constraint"
			}
		]; 
		try  {
			res
				.status(
					200
				)
				.json(
					{
						title: problem[0].title,
						description: problem[0].description,
						input: problem[0].input,
						output: problem[0].output,
						constraint: problem[0].constraint,
					}
				);
		}
		catch (error) {
			res
				.status(
					500
				);
			throw new Error(
				"Internal Server Error!"
			);
		}
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