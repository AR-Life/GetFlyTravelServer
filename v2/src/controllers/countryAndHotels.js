/* eslint-disable no-unused-vars */
const httpStatus = require("http-status");
const {
	hotel
} = require(".");
const {
	countryAndHotel, contract
} = require("../services/");

const update = async (req, res) => {
	async function updateContractCountry(contract) {
		let hotelCountry = await countryAndHotel.getContractCountry(contract._id).then((response) => response.map((x) => x.country_id?.toString())).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Hata:${e}`));
		const deleteHotelCountry = hotelCountry.filter((x) => !contract.country.includes(x));
		const addNewHotelCountry = contract.country.filter((x) => !hotelCountry.includes(x));
		for (let c of deleteHotelCountry) {
			let item = await countryAndHotel.getCountryHotels(c);
			if (item.length > 0) {
				item = item[0];
				const updateItem = {
					_id: item._id,
					body: {
						country_id: item.country_id,
						contract_id: item.contract_id.filter((x) => x.toString() !== contract._id),
					}
				}
				await countryAndHotel.update(updateItem).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Hata: ${e}`));
			}
		}  
		for (let c of addNewHotelCountry) {
			const newItem = {
				country_id: c,
				contract_id: contract._id,
			};
			await countryAndHotel.store(newItem).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Hata: ${e}`));
			/*
			let item = await countryAndHotel.getCountryHotels(c);
			if(item.length > 0){
				item = item[0];
				item.hotel_id.push(req.body.id);
				const updateItem = {
					_id:item._id,
					body:{
						country_id: item.country_id,
						hotel_id: item.hotel_id,
					}
				}
				await countryAndHotel.update(updateItem).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`Hata: ${e}`));
			}
			else{
	
			}
			*/
		}
		return await countryAndHotel.getContractCountry(contract._id);
		
	}
	
	for (let [i, c] of req.body.contract.entries()) {
		req.body.contract[i] = await contract.update({params:{id:c._id}, body:c}).then((response) => response._doc).catch((e) => console.log(`Contrat Update Hatası:${e}`));
		const country = await updateContractCountry(c);
		req.body.contract[i] = {...req.body.contract[i], country };
	}
	await res.status(httpStatus.OK).send(req.body.contract);

}
module.exports = {
	update
}