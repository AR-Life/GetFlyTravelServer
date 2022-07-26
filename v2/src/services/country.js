const Country = require("../models/country");
const index = () => {
	return Country.find({});
}
const store = (data) => {
	const country = new Country(data);
	return country.save();
};
const edit = (data) => {
	return Country.findById(data);
}
const update = (data) => {
	return Country.findByIdAndUpdate(data.params.id, data.body, {
		new: true
	});
}
const destroy = (data) => {
	return Country.findByIdAndDelete(data.params.id);
}
module.exports = {
	index,
	store,
	edit,
	update,
	destroy

}