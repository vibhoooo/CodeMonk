const asyncHandler = require("express-async-handler");
const roleHandler = asyncHandler(
	async (req, res, next) => {
		if(req.user.role !== "Admin") {
			res
				.status(
					403
				)
			throw new Error(
				"User not authorized!"
			)
		}
	}
);
module.exports = roleHandler;
