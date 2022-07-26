//import and set variables
const express = require("express");
const router = express.Router();
const {
	country
} = require("../controllers/");
const middleware = require("../middlewares");
const schema = require("../validations/");

router.get('/', middleware.auth, country.index);
router.route('/create').post(middleware.auth, middleware.validate(schema.country.createCountry), country.store);
router.get('/edit/:id', middleware.auth, country.edit);
router.post('/edit/:id', middleware.auth, country.update);
router.get('/destroy/:id', middleware.auth, country.destroy);
module.exports = router;