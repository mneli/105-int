const fs = require('fs');
const validator = require('validator');
const nodemailer = require('nodemailer');
const env = require('../../env');

module.exports = function(emailList, msg) {


    let validEmailList = [];

    for (let i = 0; i < emailList.length; i++) {
        if (validator.isEmail(emailList[i][2])) {
            validEmailList.push(emailList[i])
        }

        else {
            fs.appendFile(
                `./logs/email-errors.log`,
                `[${new Date()}]
        		Invalid email address : ${emailList[i][2]}\n`,
                function(err) {
                    if (err) console.error(err);
                });
            console.error(`Invalid email address : ${emailList[i][2]}`)
        }
    }


    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: env.sender.email,
            pass: env.sender.password
        }
    });

    let mailOptions = function(receiver, msg) {
        return ({
            from: env.sender.email,
            to: receiver[2],
            subject: `Mail to ${receiver[0]} ${receiver[1]}`,
            text: msg
        });
    };


    validEmailList.forEach(function(receiver) {

        transporter.sendMail(mailOptions(receiver, msg), function(error, info) {
            if (error) {
                console.log(error);
            } else {
                fs.appendFile(
                    `./logs/sending-success.log`,
                    `[${new Date()}] Message sent to ${receiver[0]} ${receiver[1]} : ${info.response}\n`,
                    function(err) {
                        if (err) console.error(err);
                    });
                console.log(`Message sent to ${receiver[0]} ${receiver[1]} : ${info.response}`);
            }
        });

    });

};