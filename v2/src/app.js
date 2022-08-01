//package
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config");
const loader = require("./loaders");

//routes
const {
	User,
	Market,
	Country,
	Hotel,
	Period,
	PricePerPerson,
	Pac,
	Room,
	UpdateData,
	CountryAndHotel,
	Action
} = require("./routes/");



//app use package
config();
loader();
const app = express();
app.use(express.json({
	limit: '50mb'
}));
app.use(helmet());
app.use(cors());
 

//request
console.log(`Uygulama http://${process.env.DB_HOST}:${process.env.APP_PORT} üzerinden çalışıyor ${Date.now()}`);
app.listen(process.env.APP_PORT, () => {
	app.use('/updateData', User);
	app.use('/user', User);
	app.use('/market', Market);
	app.use('/country', Country);
	app.use('/hotel', Hotel);
	app.use('/period', Period);
	app.use('/priceperperson', PricePerPerson);
	app.use('/pac', Pac);
	app.use('/room', Room);
	app.use('/countryandhotel', CountryAndHotel);
	app.use('/updateData', UpdateData);
	app.use('/action', Action);
});