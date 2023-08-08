const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModels");
const Submission = require("../models/submissionModels");
const Question = require("../models/questionModels");
// @desc Sign Up
// @route POST /admins/signup
// @access public
const signupAdmin = asyncHandler(
	async (req, res) => {
		const { adminname, email, password } = req.body;
		if (!adminname || !email || !password) {
			res
				.status(
					400
				);
			throw new Error(
				"All fields are mandatory!"
			);
		}
		const adminAvailable = await Admin.findOne(
			{
				email
			}
		);
		if (adminAvailable) {
			res
				.status(
					400
				);
			throw new Error(
				"Admin already registered!"
			);
		}
		const hashedPassword = await bcrypt.hash(
			password,
			10
		);
		const admin = await Admin.create(
			{
				adminname,
				email,
				password: hashedPassword
			}
		);
		if (admin) {
			res
				.status(
					201
				)
				.json(
					{
						id: admin.id,
						email: admin.email
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
// @route POST /admins/login
// @access public
const loginAdmin = asyncHandler(
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
		const admin = await Admin.findOne(
			{
				email
			}
		);
		if (admin && (await bcrypt.compare(password, admin.password))) {
			const accessToken = jwt.sign(
				{
					admin: {
						adminname: admin.adminname,
						email: admin.email,
						id: admin.id,
						role: "Admin"
					}
				},
				process.env.ACCESS_TOKEN_SECRET_ADMIN,
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
						accessToken,
						role: "Admin"
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
// @route GET /admins/submissions/get/:id
// @access private
const getSubmission = asyncHandler(
	async (req, res) => {

	}
);
// @desc Post a submission
// @route POST /admins/submissions/post
// @access private
const postSubmission = asyncHandler(
	async (req, res) => {

	}
);
// @desc Get all questions
// @route GET /admins/questions/get?page=${page}
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
		const allProblems = [...problems1, ...problems2];
		const itemsPerPage = 5;
		const currentPage = req.query.page || 1;
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
// @desc Get a question
// @route GET /admins/questions/get/:id
// @access private
const getQuestion = asyncHandler(
	async (req, res) => {

	}
);
// @desc Post a question 
// @route POST /admins/questions/post
// @access private
const postQuestion = asyncHandler(
	async (req, res) => {

	}
);
module.exports = {
	signupAdmin,
	loginAdmin,
	getSubmission,
	postSubmission,
	getAllQuestions,
	getQuestion,
	postQuestion
};