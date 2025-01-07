import { sendEmail } from '../../app/utils/sendEmail';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    try {
      // Send email to the user
      const result = await sendEmail({
        to: email,
        subject: 'Your Requested Resume',
        text: 'Thank you for your interest! Attached is my resume.',
        html: '<p>Thank you for your interest! Attached is my resume.</p>',
        attachments: [
          {
            filename: 'resume.pdf',
            path: 'https://dhananjay84.vercel.app/resume.pdf', // Ensure this file exists in the public folder
          },
        ],
      });

      if (result.success) {
        res.status(200).json({ message: 'Resume sent successfully!' });
      } else {
        res.status(500).json({ message: result.error });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'An error occurred while sending the email.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
