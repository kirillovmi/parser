const express = require("express");
const osmosis = require('osmosis');

let app = express();

function Parser(link, find, out) {
	return new Promise((resolve, reject) => {
		let response = [];
		osmosis
			.get(link)
			.find(find)
			.set(out)
			.data((res) => response.push(res))
			.error((error) => reject(error))
			.done(() => resolve(response));
	});
}

let link = "https://newbalance.ru/sale/";
let find = ".col-xs-6";
let out = {
	"title": ".b-catalog__goods-item-name",
	"img": ".first-img@data-src",
	"price": ".b-catalog__goods-item-price_discount"
};

app.get("/", (req, res) => {
	Parser(link, find, out)
		.then((data) => {
			//console.log(data);
			res.send(data);
		})
		.catch((error) => {
			res.send(error);
			//console.log(error);
		});
});

app.listen(process.env.PORT || 3000);