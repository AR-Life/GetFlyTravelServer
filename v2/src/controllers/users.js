const httpStatus = require("http-status");
const {
	generateAccessToken,
	generateRefreshToken
} = require("../scripts/utils/helper");
const {
	user
} = require("../services/");

const index = (req, res) => {
	user.index()
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};
const store = (req, res) => {
	user.store(req.body)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => {
			res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
		});
};
const edit = (req, res) => {
	user.edit(req.params?.id)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch(() => res.status(httpStatus.BAD_REQUEST).send({
			message: "böyle bir kullanıcı bulunamadı."
		}));
};
const update = (req, res) => {
	user.update(req)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => res.status(httpStatus.BAD_REQUEST).send(e));
}
const destroy = (req, res) => {
	user.destroy(req)
		.then(response => {
			res.status(httpStatus.OK).send(response);
		})
		.catch((e) => res.status(httpStatus.BAD_REQUEST).send(e));
}
const login = (req, res) => {
	user.login(req.body)
		.then((user) => {
			if (!user) return res.status(httpStatus.NOT_FOUND).send({
				message: "böyle bir kullanıcı bulunamadı"
			});
			user = {
				...user.toObject(),
				token: {
					access_token: generateAccessToken(user),
					refresh_token: generateRefreshToken(user)
				},
			};
			delete user.password;
			res.status(httpStatus.OK).send(user);
		})
		.catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};


module.exports = {
	index,
	store,
	edit,
	update,
	destroy,
	login

}