const Mongoose = require("mongoose");

const Contract = new Mongoose.Schema({
    season: String,
    validFrom: Date,
    seasonFromTo: {
        start: Date,
        end: Date,
    },
    market:[{
		type: Mongoose.Types.ObjectId,
		ref: "market",
	}, ],
    currency: String,
	hotel_id: {
		type: Mongoose.Types.ObjectId,
		ref: "hotel",
	}
}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("contract", Contract);

/*
Season: Summer 19
validFrom: Sözleşme geçerlilik tarihi 20/04/2019
seasonFromTo: Sezonun başlangıç ve bitiş tarihi
Board: Hangi Marketler ve ülkeler olduğu,
currency para birimi
*/
