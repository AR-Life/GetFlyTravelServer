const Mongoose = require("mongoose");

const Period = new Mongoose.Schema({
	startDate: Date,
	endDate: Date,
	stayAndArrival: Boolean,
	minStay: Number,
	release: Number,
	contract_id: {
		type: Mongoose.Types.ObjectId,
		ref: "contract",
	}
}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("period", Period);