const Mongoose = require("mongoose");

const Market = new Mongoose.Schema({
	mainMarketName: String,
	subMarketName: {
		type: String,
		unique: true,
	},
	country_id: [{
		type: Mongoose.Types.ObjectId,
		ref: "country",
	}, ],

}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("market", Market);