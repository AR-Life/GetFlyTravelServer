//import and set variables
const express = require("express");
const router = express.Router();
const {
	period
} = require("../controllers/");
const middleware = require("../middlewares");
const schema = require("../validations/");

router.get('/', middleware.auth, period.index);
router.route('/create').post(middleware.auth, middleware.validate(schema.period.createPeriod), period.store);
router.get('/edit/:id', middleware.auth, period.edit);
router.post('/edit/:id', middleware.auth, period.update);
router.post('/destroy/', middleware.auth, period.destroy);
module.exports = router;