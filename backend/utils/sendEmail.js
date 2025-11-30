import transporter from "./transporter.js";

async function sendEmail(to, subject, html) {
  try {
    return await transporter.sendMail({
      from: `Todo App <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (err) {
    throw err;
  }
}

export default sendEmail;
