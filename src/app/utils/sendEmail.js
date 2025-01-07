import nodemailer from 'nodemailer';

/**
 * Sends an email using the configured SMTP transport.
 *
 * @param {Object} options - Email options.
 * @param {string} options.to - Recipient's email address.
 * @param {string} options.subject - Email subject.
 * @param {string} options.text - Plain text content of the email.
 * @param {string} [options.html] - HTML content of the email.
 * @param {Array} [options.attachments] - Array of attachment objects (optional).
 *
 * @returns {Object} Result of the email operation.
 */
export const sendEmail = async ({ to, subject, text, html, attachments }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail email
        pass: process.env.EMAIL_PASS, // App password generated from Google
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email
      to,
      subject,
      text,
      html,
      attachments, // Attach resume or other files if needed
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error.message);
    return { success: false, error: error.message };
  }
};
