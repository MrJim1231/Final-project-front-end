const transporter = require("./transporter");

async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `Todo App <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Email sending error:", err);
    throw err;
  }
}

module.exports = sendEmail;
