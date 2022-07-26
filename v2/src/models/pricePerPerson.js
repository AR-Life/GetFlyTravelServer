const Mongoose = require("mongoose");

const PricePerPerson = new Mongoose.Schema({
	period_id: {
		type: Mongoose.Types.ObjectId,
		ref: "period",
	},
	room_id: {
		type: Mongoose.Types.ObjectId,
		ref: "room",
	},
	purchasePrice: Number,
	salesPrice: Number
}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("pricePerPerson", PricePerPerson);