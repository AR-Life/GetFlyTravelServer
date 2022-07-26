const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const passwordToHash = (password) => {
	return CryptoJs.HmacSHA256(password, CryptoJs.HmacSHA512(password, process.env.PASSWORD_HASH).toString()).toString();
};

const generateAccessToken = (user) => {

	//jwt.sign({name:'token'},'asd',{algorithm:'HS512'});
	try {
		return jwt.sign({
			name: user.firstName + ' ' + user.lastName,
			...user
		}, process.env.ACCESS_TOKEN_SECRET_KEY, {
			expiresIn: "1w"
		});
	} catch (e) {
		console.log(e.message);
	}
}
const generateRefreshToken = (user) => {

	try {
		return jwt.sign({
			name: user.firstName + ' ' + user.lastName,
			...user
		}, process.env.REFRESH_TOKEN_SECRET_KEY, {
			expiresIn: "1w"
		});
	} catch (e) {
		console.log(e.message);
	}
};

module.exports = {
	passwordToHash,
	generateAccessToken,
	generateRefreshToken,
};