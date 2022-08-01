const httpStatus = require("http-status");
const {
	hotel,
	contract,
	period,
	room,
	pricePerPerson,
	pac,
	countryAndHotel,
	action
} = require("../services/");
async function getContrat(hotelId) {
	let item = await contract.getHotelContract(hotelId).catch((e) => console.log('contrat hata: ' + e));
	for (const [i, c] of item.entries()) {
		item[i] = item[i].toObject();
		item[i].country = await countryAndHotel.getContractCountry(c._id).then((response) => response.map((x) => x.country_id)).catch((e) => console.log('Contrat hatası ' + e));
		item[i].action = await action.getContractsAction(c._id);
	}
	return item;
}
async function getPeriod(contract) {
	const returnData = [];
	for (const contratItem of contract) {
		const periodItem = await period.getContractPeriod(contratItem._id).catch((e) => console.log('Period Hata: ' + e));
		periodItem.forEach((x) => returnData.push(x));
	}
	return returnData;
}
async function getRoom(hotelId) {
	return await room.getHotelRoom(hotelId).catch((e) => console.log('Room Hatası: ' + e));
}
async function getPricePerPerson(room) {
	const returnData = [];
	for (const r of room) {
		const pricePerPersonItem = await pricePerPerson.getHotelPricePerPerson(r._id).catch((e) => console.log('PricePerPerson Hatası: ' + e));
		pricePerPersonItem.forEach((x) => {
			returnData.push(x);
		});
	}
	return returnData;
}
async function getPac(room) {
	const returnData = [];
	for (const r of room) {
		const pricePerPersonItem = await pac.getRoomPac(r._id).catch((e) => console.log('Pac Hatası: ' + e));
		pricePerPersonItem.forEach((x) => {
			returnData.push(x);
		});
	}
	return returnData;
}

const index = async (req, res) => {
	console.log('istek geldi');
	const hotels = [];
	await hotel.index()
		.then(response => {
			for (const x of response) {
				hotels.push({
					id: x._id,
					info: x.toObject(),
					period: [],
					room: [],
					pricePerPerson: [],
					pac: [],
				});
			}
		})
		.catch(e => console.log('For içinde Hata da hangi hata ?' + e));
	for (const [i, item] of hotels.entries()) {
		hotels[i].contract = await getContrat(item.id).catch((e) => console.log('Contrat hatası ' + e));
		// hotels[i].contract = await getCountry(hotels[i].contract);
		hotels[i].period = await getPeriod(item.contract).catch((e) => console.log('Period hatası ' + e));
		hotels[i].room = await getRoom(item.id).catch((e) => console.log('Room hatası ' + e));
		hotels[i].pricePerPerson = await getPricePerPerson(hotels[i].room).catch((e) => console.log('Room hatası ' + e));
		hotels[i].pac = await getPac(hotels[i].room).catch((e) => console.log('Room hatası ' + e));
	}
	res.status(httpStatus.OK).send(hotels);
};
const store = async (req, res) => {
	async function addContract(data, hotelId) {
		data.hotel_id = hotelId;
		return await contract.store(data).then((response) => response._id).catch((e) => console.log('hata:' + e));
	}
	async function addPeriod(data, contractId) {
		let pi = [];
		for (const p of data) {
			let periodId = p._id;
			delete p._id;
			p.contract_id = contractId;
			await period.store(p).then(response => pi.push({
				id: response._id,
				periodId
			}));
		}
		return pi;
	}
	async function addCountry(data, contractId) {
		let ri = [];
		for (const c of data) {
			delete c.code;
			delete c.name;
			c.country_id = c._id
			delete c._id;
			c.contract_id = contractId;
			await countryAndHotel.store(c).then(response => ri.push(response));
		}
		return ri;
	}
	async function addRoom(data, hotelId) {
		let ri = [];
		for (const r of data) {
			let roomId = r._id;
			delete r._id;
			r.hotel_id = hotelId;
			await room.store(r).then(response => ri.push({
				id: response._id,
				roomId
			}));
		}
		return ri;
	}
	async function addPricePerPerson(data, room, period) {
		let ri = [];
		for (const ppp of data) {
			let roomItem = room.find((r) => r.roomId === ppp.room_id);
			let periodItem = period.find((p) => p.periodId === ppp.period_id);
			ppp.room_id = roomItem.id;
			ppp.period_id = periodItem.id;
			delete ppp._id;
			await pricePerPerson.store(ppp).then(response => ri.push({
				id: response._id
			}));
		}
		return ri;
	}
	async function addPac(data, room, period) {
		let ri = [];
		for (const ppp of data) {
			let roomItem = room.find((r) => r.roomId === ppp.room_id);
			let periodItem = period.find((p) => p.periodId === ppp.period_id);
			ppp.room_id = roomItem.id;
			ppp.period_id = periodItem.id;
			delete ppp._id;
			await pac.store(ppp).then(response => ri.push({
				id: response._id
			}));
		}
		return ri;
	}
	let hotelId = null;
	let isset = true;
	let roomItems = req.body.room.map((x) => ({id:x._id, roomId:x._id}));
	if ('id' in req.body) {
		hotelId = req.body.id;
		isset = false;
	} else {
		isset = true;
		hotelId = await hotel.store(req.body.info).then(response => response._id).catch((e) => console.log('hata: Hotel' + e));
	}
	const contractId = await addContract(req.body.contract, hotelId).then((response => response._id)).catch((e) => console.log('hata: Contrat ' + e));
	const periodItems = await addPeriod(req.body.period, contractId).catch((e) => console.log('hata: Period' + e));
	if (isset) {
		roomItems = await addRoom(req.body.room, hotelId).catch((e) => console.log('hata: Room' + e));
	}
	await addPricePerPerson(req.body.pricePerPerson, roomItems, periodItems).catch((e) => console.log('hata: PricePerPerson ' + e));
	await addPac(req.body.pac, roomItems, periodItems).catch((e) => console.log('hata: Pac ' + e));
	await addCountry(req.body.contract.country, contractId).catch((e) => console.log('hata: Country' + e));
	req.params.id = hotelId;
	edit(req,res);
};

const edit = async (req, res) => {
	const returnData = {};
	returnData.info = await hotel.edit(req.params?.id).catch((e) => console.log('Hotel getirme Hatası ' + e));
	returnData.id = returnData.info._id;
	returnData.contract = await getContrat(returnData.id).catch((e) => console.log('Contrat hatası ' + e));
	returnData.period = await getPeriod(returnData.contract).catch((e) => console.log('Period hatası ' + e));
	returnData.room = await getRoom(returnData.id).catch((e) => console.log('Room hatası ' + e));
	returnData.pricePerPerson = await getPricePerPerson(returnData.room).catch((e) => console.log('Price Per Person hatası ' + e));
	returnData.pac = await getPac(returnData.room).catch((e) => console.log('Pac hatası ' + e));
	res.status(httpStatus.OK).send(JSON.stringify(returnData));
	
};
const update = (req, res) => {
	hotel.update(req)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => res.status(httpStatus.BAD_REQUEST).send('hata' + e));
}
const destroy = (req, res) => {
	hotel.destroy(req)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => res.status(httpStatus.BAD_REQUEST).send('hata' + e));
}

module.exports = {
	index,
	store,
	edit,
	update,
	destroy,

}