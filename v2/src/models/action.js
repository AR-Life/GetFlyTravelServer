const Mongoose = require("mongoose");

const Action = new Mongoose.Schema({
    type: String,
    room:[{
        type: Mongoose.Types.ObjectId,
        ref: "room"
    }],
    contract: {type: Mongoose.Types.ObjectId, ref:"contract"},
    stayAndArrival: Boolean,
    series: String,
    salesDate:{
        start: Date,
        end: Date,
    },
    checkInDate:{
        start: Date,
        end: Date,
    },
    combine: Boolean,
    value: [Object],
}, {
	timestamps: false,
	versionKey: false
});

module.exports = Mongoose.model("action", Action);

/*
type: Action Tipi,
    room_id:[{ Hangi odaları kapsadığı }],
    contract_id: { Hangi Kontrata ait olduğu},
    stayAndArrival: Girenler Konaklayanlar Ayrımı,
    actionSeries: Aksiyon seri numarası,
    salesData:{
        start: Satış Tarihi Başlangıç,
        end: Satış Tarihi Bitiş,
    },
    checkInDate:{
        start: Konaklama Tarihi Başlangıç,
        end: Konaklama Tarihi Bitiş,
    },
    combine: Diğer aksiyonlar ile kombine olup olmayacağı,
    value: [Aksiyona ait değerler],
*/
