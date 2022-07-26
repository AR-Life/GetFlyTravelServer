const httpStatus = require("http-status");
const {
	room,
	pricePerPerson,
	pac
} = require("../services/");

const index = (req, res) => {
	room.index()
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
const store = async (req, res) => {
	// oda ekleyeceğiz önce
	// diğerleri zaten hazır..
	async function addRoom(data, hotelId) {
		let ri = [];
		for (const r of data) {
			let roomId = r._id;
			delete r._id;
			r.hotel_id = hotelId;
			await room.store(r).then(response => ri.push({
				...response._doc,
				roomId
			}));
		}
		return ri;
	}

	async function addPricePerPerson(data, room) {
		let ri = [];
		for (const ppp of data) {
			let roomItem = room.find((p) => p.roomId === ppp.room_id);
			ppp.room_id = await roomItem._id;
			await pricePerPerson.store(ppp).then(response => ri.push(response._doc));
		}
		return ri;
	}
	async function addPac(data, room) {
		let ri = [];
		for (const ppp of data) {
			let roomItem = room.find((p) => p.roomId === ppp.room_id);
			delete ppp._id;
			ppp.room_id = await roomItem._id;
			await pac.store(ppp).then(response => ri.push(response._doc));
		}
		return ri;
	}
	try {

		const roomItems = await addRoom(req.body.room, req.body.id).catch(() => res.status(500).send(JSON.stringify({
			message: 'room'
		})));
		const pricePerPersonItems = await addPricePerPerson(req.body.pricePerPerson, roomItems).catch(() => res.status(500).send(JSON.stringify({
			message: 'price Per Person'
		})));
		const pacItems = await addPac(req.body.pac, roomItems).catch(() => res.status(500).send(JSON.stringify({
			message: 'pac'
		})));
		await res.status(200).send(JSON.stringify({
			roomItems,
			pricePerPersonItems,
			pacItems
		}));
	} catch (e) {
		res.status(500).send({
			message: 'başarısız'
		});
	}
};
const edit = (req, res) => {
	room.edit(req.params?.id)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch(() => res.status(httpStatus.BAD_REQUEST).send({
			message: "böyle bir kullanıcı bulunamadı."
		}));
};
const update = async (req, res) => {
	async function updateroom(data) {
		let pi = [];
		for (const p of data) {
			const newItem = {
				id: p._id,
			}
			delete p._id;
			newItem.body = p;
			await room.update(newItem).then(response => pi.push(response._doc));
		}
		return pi;
	}
	const ppp = await updateroom(req.body).catch((e) => 'message:' + e);
	res.send(JSON.stringify(ppp));
}
const destroy = async (req, res) => {
	async function removeRoom(data) {
		for (const p of data) {
			await room.destroy(p._id);
		}
	}
	async function removePricePerPerson(data) {
		for (const p of data) {
			await pricePerPerson.destroyRoomAfterPricePerPerson(p._id);
		}
	}
	async function removePac(data) {
		for (const p of data) {
			await pac.destroyRoomAfterPac(p._id);
		}
	}
	await removeRoom(req.body).catch(() => res.status(httpStatus.BAD_REQUEST).send('room'));
	await removePricePerPerson(req.body).catch(() => res.status(httpStatus.BAD_REQUEST).send('priceperperson'));
	await removePac(req.body).catch(() => res.status(httpStatus.BAD_REQUEST).send('removePac'));
	res.status(httpStatus.OK).send('success');
}

module.exports = {
	index,
	store,
	edit,
	update,
	destroy,

}