const nodemailer = require('nodemailer');
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
  const verificationLink = `http://localhost:3000/api/users/verify/${token}`;
  const mailOptions = {
    from: `"AB Planer" <${config.development.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Potwierdź swoje konto',
    html: `
      <h2>Witaj w AB Planer!</h2>
      <p>Kliknij poniższy link, aby aktywować swoje konto:</p>
      <a href="${verificationLink}" style="background:#007bff;color:#fff;padding:10px 15px;border-radius:5px;text-decoration:none;">Aktywuj konto</a>
      <p>Jeśli nie rejestrowałeś/aś się w naszej aplikacji, zignoruj ten e-mail.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };