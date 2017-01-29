const path = require('path');
const fs = require('fs');

module.exports = function (data) {
	if (fs.existsSync(data)) {
		return fs.readFileSync(data).toString();
	}
	return data;
};