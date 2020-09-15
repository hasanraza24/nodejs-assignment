const mailgun = require("mailgun-js");
const DOMAIN = "sandbox9ffa65614fe84e279a77707ce3d706f8.mailgun.org";
const mg = mailgun({apiKey: "245383764f2064bf6a9b7aea3582fd01-d5e69b0b-95542aca", domain: DOMAIN});

const sendMail = (mailData) => {
  return new Promise((resolve, reject) => {
    const data = {
      from: "Hasan Pizza<postmaster@sandbox9ffa65614fe84e279a77707ce3d706f8.mailgun.org>",
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

