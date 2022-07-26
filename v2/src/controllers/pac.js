const httpStatus = require("http-status");
const {
	pac
} = require("../services/");

const index = (req, res) => {
	pac.index()
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
const store = (req, res) => {
	pac.store(req.body)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => {
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
		});
};
const edit = (req, res) => {
	pac.edit(req.params?.id)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch(() => res.status(httpStatus.BAD_REQUEST).send({
			message: "böyle bir kullanıcı bulunamadı."
		}));
};
const update = async (req, res) => {
	async function updatePac(data) {
		let pi = [];
		for (const p of data) {
			const newItem = {
				id: p._id,
			}
			delete p._id;
			newItem.body = p;
			await pac.update(newItem).then(response => pi.push(response));
		}
		return pi;
	}
	const Pac = await updatePac(req.body.pac).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send('message:' + e));
	res.status(httpStatus.OK).send(Pac);
}
const destroy = (req, res) => {
	pac.destroy(req)
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