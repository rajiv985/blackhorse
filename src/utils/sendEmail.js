import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rajivjungkarki@gmail.com",         // replace with your Gmail address
      pass: "kdft qjmp hvrh zxgk",            // replace with your 16-char App Password (no spaces)
    },
  });

  const mailOptions = {
    from: "rajivjungkarki@gmail.com",           // sender
    to,                                     // recipient
    subject,                                // email subject
    text,                                   // email body
  };

  await transporter.sendMail(mailOptions);
};


export default sendEmail;  
