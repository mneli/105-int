const path = require('path');
const fs = require('fs');
// const validator = require('validator');

module.exports = function (data) {

	let emailListArr = [];

	if (fs.existsSync(data[0])) {
		emailListArr = fs.readFileSync(data[0]).toString().split("\n");
	} else {

		emailListArr = data;
	}
	emailListArr.forEach(function (elt, index, arr) {
		arr[index] = elt.replace("\"", "").replace("\"", "");
	});

	// 	if (!validator.isEmail(data[0].split(" ")[2].replace("<", "").replace(">", "")))
	// });

	// console.log();

	return emailListArr;
};