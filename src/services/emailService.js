const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const config = require('../../config/config.json');

const transporter = nodemailer.createTransport({
  host: 'smtp.wp.pl',
  port: 465,
  secure: true,
  auth: {
    user: config.development.EMAIL_USER,
    pass: config.development.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (userEmail, token) => {
  const verificationLink = `${config.development.BASE_URL}/api/users/verify/${token}`;

  const htmlContent = await ejs.renderFile(path.join(__dirname, '../views/verificationEmailTemplate.ejs'), { verificationLink });

  const mailOptions = {
    from: `"AB Planer" <${config.development.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Potwierdź swoje konto',
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };