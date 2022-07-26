const countryAndHotel = require("../models/countryAndHotel");
const index = () => {
	return countryAndHotel.find({});
}
const store = async (data) => {
	let c = await countryAndHotel.find({
		country_id: data.country_id
	}).exec();
	if (c.length > 0) {
		c = c[0];
		let isset = c.contract_id.filter((x) => x === data.contract_id);
		if (isset.length < 1) {
			let hotel = {
				contract_id: c.contract_id,
				_id: c._id,
				country_id: c.country_id
			}
			await hotel.contract_id.push(data.contract_id);
			return countryAndHotel.findByIdAndUpdate(c._id, hotel, {
				new: true
			}).populate({
				path: 'country_id',
				select: 'code name'
			}).populate({
				path: 'contract_id',
				select: '_id'
			});
		}
	} else {
		const cah = new countryAndHotel(data);
		return cah.save();
	}
};
const edit = (data) => {
	return countryAndHotel.findById(data);
}
const update = (data) => {
	return countryAndHotel.findByIdAndUpdate(data._id, data.body, {
		new: true
	});
}

function getContractCountry(id) {
	return countryAndHotel.find({
		contract_id: id
	}).exec();
}

function getCountryHotels(countryId) {
	return countryAndHotel.find({
		country_id: countryId
	}).exec();

}
module.exports = {
	index,
	store,
	edit,
	update,
	getContractCountry,
	getCountryHotels,
}