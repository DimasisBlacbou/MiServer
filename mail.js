const nodemailer = require("nodemailer");
const dns = require("dns");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MYMAIL,
    pass: process.env.MAILPASSWORD,
  },
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  debug: true,
  logger: true,
  lookup: (hostname, options, callback) => {
    return dns.lookup(hostname, { ...options, family: 4 }, callback);
  },

  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Mail transporter configuration error", error);
  } else {
    console.log("Mail transporter is ready");
  }
});
async function sendRegisterEmail(mail) {
  try {
    const info = await transporter.sendMail({
      from: `"Dante" <${process.env.MYMAIL}>`,
      to: mail,
      subject: "Hello, we see you registered!",
      text: "Hi, welcome to our store!",
    });

    console.log("Message sent:", info.messageId);
  } catch (err) {
    console.error("Failed to send registration email", err);
    // throw err;
  }
}
async function sendOrder(mail) {
  console.log(`Attempting to send order email to ${mail}`);
  try {
    const info = await transporter.sendMail({
      from: '"Dante" <' + process.env.MYMAIL + ">",
      to: mail,
      subject: "Your order is accepted",
      text: "Hi, your order has been accepted.",
    });

    console.log("Order email sent, messageId:", info && info.messageId);
    return { ok: true, info };
  } catch (err) {
    console.error("Failed to send order email:", err && err.message);
    if (err && err.response) console.error("SMTP response:", err.response);
    if (err && err.code) console.error("Error code:", err.code);
    return { ok: false, error: err };
  }
}
module.exports = { sendRegisterEmail, sendOrder };
