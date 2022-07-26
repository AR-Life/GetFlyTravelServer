const Room = require("../models/updateData");
const index = () => {
	return Room.find({});
}
const store = (data) => {
	const room = new Room(data);
	return room.save();
};
const edit = (data) => {
	return Room.findById(data);
}
const update = (data) => {
	return Room.findByIdAndUpdate(data.id, data.body, {
		new: true
	});
}
const destroy = (data) => {
	return Room.findByIdAndDelete(data);
}

function getHotelRoom(id) {
	return Room.find({
		hotel_id: id
	});
}


module.exports = {
	index,
	store,
	edit,
	update,
	destroy,
	getHotelRoom
}