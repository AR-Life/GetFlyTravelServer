const Market = require("../models/market");
const index = () => {
	return Market.find({}).populate({
		path: 'country_id',
		select: 'code name'
	});
}
const store = (data) => {
	const market = new Market(data);
	return market.save();
};
const edit = (data) => {
	return Market.findById(data);
}
const update = (data) => {
	return Market.findByIdAndUpdate(data.params.id, data.body, {
		new: true
	});
}
const destroy = (data) => {
	return Market.findByIdAndDelete(data.params.id);
}



module.exports = {
	index,
	store,
	edit,
	update,
	destroy,

}