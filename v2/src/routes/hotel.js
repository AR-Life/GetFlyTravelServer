//import and set variables
const express = require("express");
const router = express.Router();
const {
	hotel
} = require("../controllers/");
const middleware = require("../middlewares");
const schema = require("../validations/");

router.get('/', middleware.auth, hotel.index);
router.route('/create').post(middleware.auth, middleware.validate(schema.hotel.createHotel), hotel.store);
router.get('/edit/:id', middleware.auth, hotel.edit);
router.post('/edit/:id', middleware.auth, hotel.update);
router.get('/destroy/:id', middleware.auth, hotel.destroy);
module.exports = router;