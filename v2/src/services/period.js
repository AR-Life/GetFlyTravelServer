const Period = require("../models/period");
const index = () => {
	return Period.find({});
}
const store = (data) => {
	const period = new Period(data);
	return period.save();
};
const edit = (data) => {
	return Period.findById(data);
}
const update = (data) => {
	return Period.findByIdAndUpdate(data.id, data.body, {
		new: true
	});
}
const destroy = (data) => {
	return Period.findByIdAndDelete(data);
}

function getContractPeriod(id) {
	return Period.find({
		contract_id: id
	});
}



module.exports = {
	index,
	store,
	edit,
	update,
	destroy,
	getContractPeriod

}