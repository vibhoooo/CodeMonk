const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const validateTokenHandlerAdmin = asyncHandler(
	async (req, res, next) => {
		let token;
		let authHeader = req.headers.authorization;
		if (authHeader && authHeader.startsWith("Bearer")) {
			token = authHeader.split(" ")[1];
			jwt.verify(
				token,
				process.env.ACCESS_TOKEN_SECRET_ADMIN,
				(err, decoded) => {
					if (err) {
						res
							.status(
								401
							);
						throw new Error(
							"Admin not authorized!"
						);
					}
					req.admin = decoded.admin;
					next();
				}
			);
		}
		else {
			res
				.status(
					401
				)
			throw new Error(
				"Token missing!"
			)
		}
	}
);
module.exports = validateTokenHandlerAdmin;