// esto no funciono, despues lo soluciono o intento otra cosa

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendForgotPasswordEmail = async (to, token) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: '"Soporte" <noreply@example.com>',
    to,
    subject: 'Restablecimiento de contraseña',
    html: `
      <p>Hola,</p>
      <p>Parece que solicitaste restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
      <a href="${resetLink}">Restablecer contraseña</a>
      <p>Si no solicitaste esto, simplemente ignora este correo.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = { sendForgotPasswordEmail };
