const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let otpStorage = {}; // Temporary storage for OTPs

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'anomalyx04@gmail.com',
    pass: 'gavc nqrf daph oprf', // Replace with your App Password
  },
});

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP Route
app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  otpStorage[email] = otp; // Store OTP temporarily

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP for verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send OTP' });
    }
    res.json({ message: 'OTP sent successfully' });
  });
});

// Verify OTP Route
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (otpStorage[email] === otp) {
    delete otpStorage[email]; // Remove OTP after successful verification
    res.json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
