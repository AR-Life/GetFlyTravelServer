const Action = require("../models/action");
const index = () => {
	return Action.find({});
}
const store = (data) => {
	const action = new Action(data);
	return action.save();
};
const edit = (data) => {
	return Action.findById(data);
}
const update = (data) => {
	return Action.findByIdAndUpdate(data.params.id, data.body, {
		new: true
	});
}
const destroy = (data) => {
	return Action.findByIdAndDelete(data.params.id);
}
const getContractsAction = (id) => {
	return Action.find({contract:id}).exec()
}
module.exports = {
	index,
	store,
	edit,
	update,
	destroy,
	getContractsAction

}