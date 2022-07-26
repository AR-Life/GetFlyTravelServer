const User = require("../models/users");
const {
	passwordToHash
} = require("../scripts/utils/helper");
const index = () => {
	return User.find({});
}
const store = (data) => {
	data.password = passwordToHash(data.password);
	const user = new User(data);
	return user.save();
};
const edit = (data) => {
	return User.findById(data);
}
const update = (data) => {
	data.body.password ? data.body.password = passwordToHash(data.body.password) : true;
	return User.findByIdAndUpdate(data.params.id, data.body, {
		new: true
	});
}
const destroy = (data) => {
	return User.findByIdAndDelete(data.params.id);
}
const login = (data) => {
	data.password = passwordToHash(data.password);
	console.log(data);
	return User.findOne(data);
}


module.exports = {
	index,
	store,
	edit,
	update,
	destroy,
	login

}