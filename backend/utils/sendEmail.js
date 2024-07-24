import { createTransport } from "nodemailer";

export const sendMail = (to, subject, text) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAIL_USER,
      pass: process.env.NODEMAIL_PASS,
    },
  });
  transport.sendMail(
    {
      from: process.env.NODEMAIL_USER,
      to,
      subject,
      text,
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response);
      }
    }
  );
};
