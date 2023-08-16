const mongoose = require("mongoose");
const adminSchema = mongoose.Schema(
	{
		adminname: {
			type: String,
			required: [
				true,
				"Please enter adminname!"
			]
		},
		email: {
			type: String,
			required: [
				true,
				"Please enter email!"
			],
			unique: [
				true,
				"email already taken!"
			]

		},
		password: {
			type: String,
			required: [
				true,
				"Please enter password!"
			]
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model(
	"Admin",
	adminSchema
);