import nodemailer from 'nodemailer';

async function sendMail(Subject:string,Body:string,To:string) {
  console.log("done");
  console.log(process.env.EMAIL_USER," ",process.env.EMAIL_PASS)
  // Create a transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send mail
  let info = await transporter.sendMail({
    from: '"You" <pricehunt.pbl@gmail.com>',
    to: To,
    subject: Subject,
    html:Body,
  });

  console.log("Message sent: %s", info.messageId);
}

export default sendMail;
