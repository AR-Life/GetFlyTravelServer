const Mongoose = require("mongoose");

const Country = new Mongoose.Schema({
	code: String,
	name: String,
}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("country", Country);