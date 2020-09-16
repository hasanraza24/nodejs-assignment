const mailgun = require("mailgun-js");
const config = require('../config/config')
const mg = mailgun({apiKey: config.mail.apiKey, domain: config.mail.domain});

const sendMail = (mailData) => {
  return new Promise((resolve, reject) => {
    const data = {
      from: `Hasan Pizza<postmaster@${config.mail.domain}>`,
      to: mailData.to,
      subject: mailData.subject,
      text: mailData.text
    };
    mg.messages().send(data, function (error, body) {
      if (error) reject(error)
      else resolve(body)
    });
  })
}

module.exports = {
  sendMail
}

