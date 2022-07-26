const httpStatus = require("http-status");
const logger = require("../scripts/logger/users");

const validate = (schema) => (req, res, next) => {
	const {
		value,
		error
	} = schema.validate(req.body);
	if (error) {
		const errorMessage = error.details?.map(detail => detail.message).join(", ");
		logger.log({
			level: "error",
			message: errorMessage,
		});
		res.status(httpStatus.BAD_REQUEST).json({
			error: errorMessage
		});

		return;
	}
	Object.assign(req, value);
	return next();
};

module.exports = validate;