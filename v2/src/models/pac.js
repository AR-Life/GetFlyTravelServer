const Mongoose = require("mongoose");

const Pac = new Mongoose.Schema({
	period_id: {
		type: Mongoose.Types.ObjectId,
		ref: "period",
	},
	room_id: {
		type: Mongoose.Types.ObjectId,
		ref: "room",
	},
	adultSize: Number,
	childSize: Number,
	calc: Number,
	extBed: {
		active: {
			type: Boolean,
			default: false,
		},
		value: {
			type: Boolean,
			default: false,
		}
		
	},
	age: Array
}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("pac", Pac);