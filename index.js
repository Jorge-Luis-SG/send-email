const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config()
const app = express();


app.use(bodyParser.json());
app.use(cors());

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
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
})

app.listen();
