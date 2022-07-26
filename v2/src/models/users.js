const Mongoose = require("mongoose");

const User = new Mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		index: {
			unique: true,
			dropDups: true
		}
	},
	password: String,
}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("user", User);