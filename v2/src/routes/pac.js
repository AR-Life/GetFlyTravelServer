//import and set variables
const express = require("express");
const router = express.Router();
const {
	pac
} = require("../controllers/");
const middleware = require("../middlewares");
const schema = require("../validations/");

router.get('/', middleware.auth, pac.index);
router.route('/create').post(middleware.auth, middleware.validate(schema.pac.createPac), pac.store);
router.get('/edit/:id', middleware.auth, pac.edit);
router.post('/edit', middleware.auth, pac.update);
router.post('/destroy/', middleware.auth, pac.destroy);
module.exports = router;