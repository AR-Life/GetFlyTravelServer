//import and set variables
const express = require("express");
const router = express.Router();
const {
	action
} = require("../controllers/");
const middleware = require("../middlewares");
const schema = require("../validations/");

router.get('/', middleware.auth, action.index);
router.get('/:id', middleware.auth, action.getContractsAction);
router.route('/create').post(middleware.auth, middleware.validate(schema.action.action), action.store);
router.get('/edit/:id', middleware.auth, action.edit);
router.post('/edit/:id', middleware.auth, action.update);
router.get('/destroy/:id', middleware.auth, action.destroy);
module.exports = router;