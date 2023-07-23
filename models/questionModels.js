const mongoose = require("mongoose");
const questionSchema = mongoose.Schema(
	{
		admin_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Admin"
		},
		question_id: {
			type: String,
			required: [
				true,
				"Please enter question_id!"
			],
			unique: [
				true,
				"question_id already taken!"
			]
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
		description: {
			type: String,
			required: [
				true,
				"Please enter description!"
			]
		},
		constraint: {
			type: String,
			required: [
				true,
				"Please enter constraint!"
			]
		},
		testcase: {
			type: String,
			required: [
				true,
				"Please enter testcase!"
			]
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model(
	"Question",
	questionSchema
);