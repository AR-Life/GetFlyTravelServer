const Contract = require("../models/contract");
const index = () => {
	return Contract.find({});
}
const store = (data) => {
	const contract = new Contract(data);
	return contract.save();
};
const edit = (data) => {
	return Contract.findById(data);
}
const update = (data) => {
	return Contract.findByIdAndUpdate(data.params.id, data.body, {
		new: true
	});
}
const destroy = (data) => {
	return Contract.findByIdAndDelete(data.params.id);
}
const getHotelContract = (hotel_id) => {
	return Contract.find({hotel_id:hotel_id});
}
module.exports = {
	index,
	store,
	edit,
	update,
	destroy,
	getHotelContract
}