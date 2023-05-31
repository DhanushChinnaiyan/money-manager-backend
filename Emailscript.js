import nodemailer from "nodemailer";

export const mail = (url, userEmail) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure:true,
      auth: {
        user: "dhanushms4021@gmail.com",
        pass: "jqcszxqobfjtcmyd",
      },
      tls: {
        rejectUnauthorized: true,
      },
    });
  
    const mailSubject = "Reset Your Password";
    const message = `Click on the given url to reset your password - ${url}`;
  
    const info = {
      from: "dhanushms4021@gmail.com",
      to: userEmail,
      subject: mailSubject,
      text: message,
    };
  
    transporter.sendMail(info, (error) => {
      if (error) {
        console.log("mail error", error);
      } else {
        console.log("email has sent");
      }
    });
  };
