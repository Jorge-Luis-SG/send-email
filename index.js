const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config()
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(cors({
  origin: ['http://localhost:4200', 'https://send-email-2roj.onrender.com']
}));

app.post('/send-email',(req,res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
      user:process.env.DB_USER,
      pass:process.env.DB_PASS
    }
  });

  const mailOptions = {
    from: process.env.DB_USER,
    to: process.env.DB_USER, // Replace with recipient email address
    subject: 'Una nueva persona ha enviado un formulario',
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    } else {
      res.status(200).json({ message: 'Email sent successfully', info: info.response });
    }
  });
})

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});
