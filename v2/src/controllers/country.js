const httpStatus = require("http-status");
const {
	country
} = require("../services/");

const index = (req, res) => {
	country.index()
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
const store = (req, res) => {
	country.store(req.body)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => {
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
		});
};
const edit = (req, res) => {
	country.edit(req.params?.id)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch(() => res.status(httpStatus.BAD_REQUEST).send({
			message: "böyle bir kullanıcı bulunamadı."
		}));
};
const update = (req, res) => {
	country.update(req)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => res.status(httpStatus.BAD_REQUEST).send(e));
}
const destroy = (req, res) => {
	country.destroy(req)
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
	destroy
}