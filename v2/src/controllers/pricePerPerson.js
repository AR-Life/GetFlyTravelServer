const httpStatus = require("http-status");
const {
	market,
	pricePerPerson
} = require("../services/");

const index = (req, res) => {
	market.index()
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
const store = (req, res) => {
	market.store(req.body)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => {
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
		});
};
const edit = (req, res) => {
	market.edit(req.params?.id)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch(() => res.status(httpStatus.BAD_REQUEST).send({
			message: "böyle bir kullanıcı bulunamadı."
		}));
};
const update = async (req, res) => {
	async function updatePricePerPerson(data) {
		let pi = [];
		for (const p of data) {
			const newItem = {
				id: p._id,
			}
			delete p._id;
			newItem.body = p;
			await pricePerPerson.update(newItem).then(response => pi.push(response));
		}
		return pi;
	}
	const ppp = await updatePricePerPerson(req.body).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send('message:' + e));
	res.status(httpStatus.OK).send(ppp);
}
const destroy = (req, res) => {
	market.destroy(req)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => res.status(httpStatus.BAD_REQUEST).send(e));
}

module.exports = {
	index,
	store,
	edit,
	update,
	destroy,

}