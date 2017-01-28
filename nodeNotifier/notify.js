const mailParser = require('./private_modules/emailParser');
const msgParser = require('./private_modules/msgParser');

if (process.argv.length < 4) {
	throw new Error(`Missing parameters, expected at least 2 parameters.
		Received ${process.argv.length - 2} : ${process.argv.slice(-1)[0]}`
	);
}

let mailList = mailParser(process.argv.slice(2, -1));
let msg = msgParser(process.argv.slice(-1)[0]);