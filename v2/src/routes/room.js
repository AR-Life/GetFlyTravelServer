//import and set variables
const express = require("express");
const router = express.Router();
const {
	room
} = require("../controllers/");
const middleware = require("../middlewares");
const schema = require("../validations/");

router.get('/', middleware.auth, room.index);
router.route('/create').post(middleware.auth, middleware.validate(schema.room.createRoom), room.store);
router.get('/edit/:id', middleware.auth, room.edit);
router.post('/edit/:id', middleware.auth, room.update);
router.post('/destroy/', middleware.auth, room.destroy);
module.exports = router;