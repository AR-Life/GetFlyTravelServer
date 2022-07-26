const Mongoose = require("mongoose");

const UpdateData = new Mongoose.Schema({
	hotel: Date,
	market: Date,
}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("updateData", UpdateData);