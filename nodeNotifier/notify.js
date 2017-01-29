const emailParser = require('./private_modules/emailParser');
const msgParser = require('./private_modules/msgParser');
const emailSender = require('./private_modules/emailSender');

if (process.argv.length < 4) {
	throw new Error(`Missing parameters, expected at least 2 parameters.
		Received ${process.argv.length - 2} : ${process.argv.slice(-1)[0]}`
	);
}

let emailList = emailParser(process.argv.slice(2, -1));
let msg = msgParser(process.argv.slice(-1)[0]);

emailSender(emailList, msg);


// TODO: regex replace instead of multiple replace
// TODO:check existance of log files and write before append
