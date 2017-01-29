const path = require('path');
const fs = require('fs');

module.exports = function (data) {

	let emailList = [];

	if (fs.existsSync(data[0])) {
		emailList = fs.readFileSync(data[0]).toString().split("\n");
	} else {

		emailList = data;
	}


	emailList.forEach(function (elt, index, arr) {
		arr[index] = elt.replace("\"", "").replace("\"", "").replace("<", "").replace(">", "").split(" ");
	});

	let correctEmailList = [];

	for (let i = 0; i < emailList.length; i++) {
		if (emailList[i].length !== 3) {
			fs.appendFile(
				`./logs/input-errors.log`,
				`[${new Date()}]
				Wrong email format : <name> <surname> <email>(expected) ${emailList[i]}(received)\n`,
				function (err) {
					if (err) console.error(err);
				});
			console.error(`Wrong email format : <name> <surname> <email>(expected) ${emailList[i]}(received)`);
		} else {
			correctEmailList.push(emailList[i]);
		}
	}

	return correctEmailList;
};