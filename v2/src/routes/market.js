//import and set variables
const express = require("express");
const router = express.Router();
const {
	market
} = require("../controllers/");
const middleware = require("../middlewares");
const schema = require("../validations/");

router.get('/', middleware.auth, market.index);
router.route('/create').post(middleware.auth, middleware.validate(schema.market.createMarket), market.store);
router.get('/edit/:id', middleware.auth, market.edit);
router.post('/edit/:id', middleware.auth, market.update);
router.get('/destroy/:id', middleware.auth, market.destroy);
module.exports = router;