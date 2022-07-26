const express = require("express");
const router = express.Router();
const {
	countryAndHotel
} = require("../controllers/");
const middleware = require("../middlewares");


router.post('/edit/', middleware.auth, countryAndHotel.update);
module.exports = router;