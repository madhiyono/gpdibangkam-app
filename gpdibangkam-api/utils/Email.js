const nodemailer = require("nodemailer");

// Konfigurasi SMTP
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: process.env.SMTP_SECURE === "true",
//   auth: {
//     user: process.env.SMTP_USERNAME,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Fungsi utilitas untuk mengirim email
async function sendEmailText(to, subject, text) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Terkirim:", info.response);
  } catch (error) {
    console.error("Gagal Mengirim Email:", error);
    throw new Error("Gagal Mengirim Email:", error);
  }
}

async function sendEmailHTML(to, subject, html) {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Terkirim:", info.response);
  } catch (error) {
    console.error("Gagal Mengirim Email:", error);
    throw new Error("Gagal Mengirim Email:", error);
  }
}

module.exports = {
  sendEmailText,
  sendEmailHTML,
};
