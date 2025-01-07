// pages/api/send-email.js

import nodemailer from 'nodemailer';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle file uploads
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    // Handle the form data
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: 'Error parsing form data' });
      }

      const { interviewDate, startTime, endTime, meetingLink } = fields;
      const jobDescriptionFile = files.jobDescription ? files.jobDescription[0] : null;

      try {
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
          service: 'gmail', // Use Gmail or any other email service provider
          auth: {
            user: process.env.EMAIL_USER, // Your email address
            pass: process.env.EMAIL_PASS, // Your email password
          },
        });

        // Setup email data
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'dhananjaybansal28@gmail.com', // Destination email
          subject: 'New Interview Scheduled',
          html: `
            <h3>Interview Scheduled Details</h3>
            <p><strong>Date:</strong> ${interviewDate}</p>
            <p><strong>Start Time:</strong> ${startTime}</p>
            <p><strong>End Time:</strong> ${endTime}</p>
            <p><strong>Meeting Link:</strong> <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
          `,
          attachments: jobDescriptionFile
            ? [
                {
                  filename: jobDescriptionFile.originalFilename,
                  content: jobDescriptionFile.filepath,
                  encoding: 'base64',
                },
              ]
            : [],
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Send success response
        res.status(200).json({ message: 'Email sent successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email', error });
      }
    });
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
