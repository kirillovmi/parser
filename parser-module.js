const osmosis = require('osmosis');

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

module.exports = Parser;