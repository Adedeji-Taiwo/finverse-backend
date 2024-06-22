/* eslint-disable no-undef */
const nodemailer = require("nodemailer");
const waitListEmail = require("../pages/waitListEmail");

module.exports = async (email, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      PORT: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: {
        name: process.env.NAME,
        address: process.env.USER,
      },
      to: email,
      subject: subject,
      html: waitListEmail(),
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};
