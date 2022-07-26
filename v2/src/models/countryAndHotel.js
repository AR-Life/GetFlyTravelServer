const Mongoose = require("mongoose");

const CountryAndHotel = new Mongoose.Schema({
	country_id: {
		type: Mongoose.Types.ObjectId,
		ref: "country",
		index: true
	},
	contract_id: [{
		type: Mongoose.Types.ObjectId,
		ref: "contract",
	}, ]
}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("countryAndHotel", CountryAndHotel);