// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like your HTML form)
app.use(express.static(path.join(__dirname, 'dist')));

// Handle form submission
app.post('/send', (req, res) => {
    const { email, subject, message } = req.body;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other email services
        auth: {
            user: 'abhishamathew007@gmail.com',
            pass: 'Godis1love!'
        }
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'abhishamathew007@gmail.com',
        subject: subject,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Something went wrong.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully!');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
