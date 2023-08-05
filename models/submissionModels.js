const mongoose = require("mongoose");
const submissionSchema = mongoose.Schema(
	{
		question_id: {
			type: String,
			unique: [
				true,
				"question_id already taken!"
			]
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		admin_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Admin"
		},
		title: {
			type: String,
			required: [
				true,
				"Please enter title!"
			],
			unique: [
				true,
				"title already taken!"
			]
		},
		code: {
			type: String,
			required: [
				true,
				"Please write some code!"
			]
		},
		lang: {
			type: String,
			enum: [
				"C",
				"C++",
				"Java",
				"Python"
			],
			required: [
				true,
				"Please select langauge!"
			]
		},
		status: {
			type: String,
			enum: [
				"Pending",
				"AC",
				"WA",
				"RE",
				"TLE",
				"MLE",
			],
			default: "Pending"
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model(
	"Submission",
	submissionSchema
);