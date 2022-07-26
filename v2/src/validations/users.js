const Joi = require("joi");
const createUser = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});
const loginUser = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

module.exports = {
	createUser,
	loginUser
}