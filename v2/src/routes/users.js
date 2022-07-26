//import and set variables
const express = require("express");
const router = express.Router();
const {
	user
} = require("../controllers/");
const middleware = require("../middlewares");
const schema = require("../validations/");

router.get('/', middleware.auth, user.index);
router.route('/create').post(middleware.auth, middleware.validate(schema.user.createUser), user.store);
router.get('/edit/:id', middleware.auth, user.edit);
router.post('/edit/:id', middleware.auth, user.update);
router.get('/destroy/:id', middleware.auth, user.destroy);
router.post('/login', middleware.validate(schema.user.loginUser), user.login);
module.exports = router;