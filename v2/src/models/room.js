const Mongoose = require("mongoose");

const Room = new Mongoose.Schema({
	name: String,
	maxAdult: Number,
	maxChild: Number,
	qouta: Number,
	hotel_id: {
		type: Mongoose.Types.ObjectId,
		ref: "hotel",
	}
}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("room", Room);