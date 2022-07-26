const Hotel = require("../models/hotel");
const index = () => {
	return Hotel.find({});
}
const store = (data) => {
	const hotel = new Hotel(data);
	return hotel.save();
};
const edit = (data) => {
	return Hotel.findById(data);
}
const update = (data) => {
	return Hotel.findByIdAndUpdate(data.params.id, data.body, {
		new: true
	});
}
const destroy = (data) => {
	return Hotel.findByIdAndDelete(data.params.id);
}



module.exports = {
	index,
	store,
	edit,
	update,
	destroy,

}