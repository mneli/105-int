const path = require('path');
const fs = require('fs');
const validator = require('validator');

module.exports = function (data) {
	// console.log(validator.isEmail(data[0].split(" ")[2].replace("<", " ")));
	console.log(validator.isEmail(data[0].split(" ")[2].replace("<", "").replace(">", "")));
	// if (fs.existsSync(data)) {
	// 	return fs.readFileSync(data).toString();
	// }
	// return data;
};