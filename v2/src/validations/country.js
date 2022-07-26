const Joi = require("joi");
const createCountry = Joi.array().items();
/*
Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
});*/
module.exports = {
	createCountry
}