const Joi = require("joi");
const createMarket = Joi.object({
	mainMarketName: Joi.string(),
	subMarketName: Joi.string(),
	country_id: Joi.array()
});
module.exports = {
	createMarket
}