const pricePerPerson = require("../models/pricePerPerson");
const index = () => {
	return pricePerPerson.find({});
}
const store = (data) => {
	const ppp = new pricePerPerson(data);
	return ppp.save();
};
const edit = (data) => {
	return pricePerPerson.findById(data);
}
const update = (data) => {
	return pricePerPerson.findByIdAndUpdate(data.id, data.body, {
		new: true
	});
}
const destroy = (data) => {
	return pricePerPerson.findByIdAndDelete(data);
}
const destroyPeriodAfterPricePerPerson = (data) => {
	return pricePerPerson.find({
		period_id: data
	}).remove();
}
const destroyRoomAfterPricePerPerson = (data) => {
	return pricePerPerson.find({
		room_id: data
	}).remove();
}

function getHotelPricePerPerson(id) {
	return pricePerPerson.find({
		room_id: id
	});
}



module.exports = {
	index,
	store,
	edit,
	update,
	destroy,
	getHotelPricePerPerson,
	destroyPeriodAfterPricePerPerson,
	destroyRoomAfterPricePerPerson

}