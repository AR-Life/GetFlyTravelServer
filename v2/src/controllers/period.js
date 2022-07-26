const httpStatus = require("http-status");
const {
	period,
	pricePerPerson,
	pac
} = require("../services/");

const index = (req, res) => {
	period.index()
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
const store = async (req, res) => {
	async function addPeriod(data, hotelId) {
		let pi = [];
		for (const p of data) {
			let periodId = p._id;
			delete p._id;
			p.hotel_id = hotelId;
			await period.store(p).then(response => pi.push({
				...response._doc,
				periodId
			}));
		}
		return pi;
	}
	async function addPricePerPerson(data, period) {
		let ri = [];
		for (const ppp of data) {
			let periodItem = period.find((p) => p.periodId === ppp.period_id);
			ppp.period_id = await periodItem._id;
			await pricePerPerson.store(ppp).then(response => ri.push(response._doc));
		}
		return ri;
	}

	async function addPac(data, period) {
		let ri = [];
		for (const ppp of data) {
			let periodItem = period.find((p) => p.periodId === ppp.period_id);
			delete ppp._id;
			ppp.period_id = await periodItem._id;
			await pac.store(ppp).then(response => ri.push(response._doc));
		}
		return ri;
	}
	const periodItems = await addPeriod(req.body.period, req.body.id).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
	const pricePerPersonItems = await addPricePerPerson(req.body.pricePerPerson, periodItems).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
	const pacItems = await addPac(req.body.pac, periodItems).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
	await res.status(httpStatus.OK).send(JSON.stringify({
		periodItems,
		pricePerPersonItems,
		pacItems
	}));
};
const edit = (req, res) => {
	period.edit(req.params?.id)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => res.status(httpStatus.BAD_REQUEST).send(e));
};
const update = async (req, res) => {
	const result = [];
	if (req.body.length > 0) {
		req.body = req.body.map((x) => {
			let newItem = {body:x, id: x._id};
			delete newItem.body._id;
			return newItem;		})
		for (const p of req.body) {
			await period.update(p).then((response) => result.push(response)).catch((e) => res.status(500).send(e));
		}
	}
	await res.status(httpStatus.OK).send(result);
	/*
	period.update(req)
	.then(response =>{
	    res.status(httpStatus.OK).send(response);
	})
	.catch((e)=> res.status(httpStatus.BAD_REQUEST).send(e));*/
}
const destroy = async (req, res) => {
	async function removePeriod(data) {
		for (const p of data) {
			await period.destroy(p);
		}
	}
	async function removePricePerPerson(data) {
		for (const p of data) {
			await pricePerPerson.destroyPeriodAfterPricePerPerson(p);
		}
	}
	async function removePac(data) {
		for (const p of data) {
			await pac.destroyPeriodAfterPac(p);
		}
	}
	await removePeriod(req.body).catch((e) => res.status(httpStatus.BAD_REQUEST).send(e));
	await removePricePerPerson(req.body).catch((e) => res.status(httpStatus.BAD_REQUEST).send(e));
	await removePac(req.body).catch((e) => res.status(httpStatus.BAD_REQUEST).send(e));
	res.status(httpStatus.OK).send('success');
}

module.exports = {
	index,
	store,
	edit,
	update,
	destroy,

}