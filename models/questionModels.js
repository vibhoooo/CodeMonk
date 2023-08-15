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
		category: {
			type: String,
			enum: [
				"Easy",
				"Medium",
				"Hard"
			],
			default: "Easy",
			required: [
				true,
				"Please enter category!"
			]
		},
		constraint: {
			type: String,
			required: [
				true,
				"Please enter constraint!"
			]
		},
		input: {
			type: String,
			required: [
				true,
				"Please enter sample input!"
			]
		},
		output: {
			type: String,
			required: [
				true,
				"Please enter sample output!"
			]
		},
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model(
	"Question",
	questionSchema
);