const Pac = require("../models/Pac");
const index = () => {
	return Pac.find({});
}
const store = (data) => {
	const pac = new Pac(data);
	return pac.save();
};
const edit = (data) => {
	return Pac.findById(data);
}
const update = (data) => {
	return Pac.findByIdAndUpdate(data.id, data.body, {
		new: true
	});
}
const destroy = (data) => {
	return Pac.findByIdAndDelete(data.params.id);
}
const destroyPeriodAfterPac = (data) => {
	return Pac.find({
		period_id: data
	}).remove();
}
const destroyRoomAfterPac = (data) => {
	return Pac.find({
		room_id: data
	}).remove();
}

function getRoomPac(id) {
	return Pac.find({
		room_id: id
	});
}



module.exports = {
	index,
	store,
	edit,
	update,
	destroy,
	getRoomPac,
	destroyPeriodAfterPac,
	destroyRoomAfterPac

}