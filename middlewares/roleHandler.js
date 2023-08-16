const asyncHandler = require("express-async-handler");
const roleHandler = asyncHandler(
	async (req, res, next) => {
		if(req.admin.role !== "Admin") {
			res
				.status(
					403
				)
			throw new Error(
				"Admin not authorized!"
			)
		}
		next();
	}
);
module.exports = roleHandler;
