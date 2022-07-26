const Mongoose = require("mongoose");

const Hotel = new Mongoose.Schema({
	name: {
		type: String,
		unique: true,
	},
	companyName: String,
	hostelType: String,
	administration: String,
	region: String,
	location: String,
	tel: String,
	web: String,
	firstMail: String,
	secondMail: String,
	rating: Number,

}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("hotel", Hotel);