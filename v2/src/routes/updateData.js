//import and set variables
const express = require("express");
const router = express.Router();
const {
	updateData
} = require("../controllers/");
const middleware = require("../middlewares");

router.post('/', middleware.auth, updateData.index);
module.exports = router;