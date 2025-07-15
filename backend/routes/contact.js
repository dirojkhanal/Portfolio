const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const fs = require('fs');
const path = require('path');

function logContactSubmission(submission) {
  const file = path.join(__dirname, '../data/contact_submissions.json');
  let submissions = [];
  if (fs.existsSync(file)) {
    submissions = JSON.parse(fs.readFileSync(file, 'utf-8'));
  }
  submissions.push(submission);
  fs.writeFileSync(file, JSON.stringify(submissions, null, 2));
}

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'dirojkhanal16@gmail.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    const submission = { name, email, message, timestamp: new Date().toISOString() };
    logContactSubmission(submission);
    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send message.' });
  }
});

module.exports = router; 