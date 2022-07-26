const httpStatus = require("http-status");
const {
	market
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
const update = (req, res) => {
	market.update(req)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => res.status(httpStatus.BAD_REQUEST).send(e));
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