//import and set variables
const express = require("express");
const router = express.Router();
const {
	pricePerPerson
} = require("../controllers/");
const middleware = require("../middlewares");
const schema = require("../validations/");

router.get('/', middleware.auth, pricePerPerson.index);
router.route('/create').post(middleware.auth, middleware.validate(schema.pricePerPerson.createPricePerPerson), pricePerPerson.store);
router.get('/edit/:id', middleware.auth, pricePerPerson.edit);
router.post('/edit/:id', middleware.auth, pricePerPerson.update);
router.post('/destroy/', middleware.auth, pricePerPerson.destroy);
module.exports = router;