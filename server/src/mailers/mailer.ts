import ejs from "ejs";
import * as nodemailer from "nodemailer";
import { config } from "../config/app.config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: config.NODEMAILER,
    pass: config.NODEMAILER_PASS,
  },
});

interface TypeTemplatesEmail {
  requestOTP: string;
  verifyEmail: string;
}

export const templatesEmail = {
  requestOTP: {
    subject: "Request OTP",
    template: "/requestOTP.ejs",
  },
  verifyEmail: {
    subject: "Verify Email",
    template: "/verifyEmail.ejs",
  },
};

export type TemplatesEmailKeys = keyof typeof templatesEmail;

export type TemplatesEmailValues =
  (typeof templatesEmail)[keyof typeof templatesEmail];

export const getTemplateEmail = (
  tem: TemplatesEmailKeys
): TemplatesEmailValues => {
  return templatesEmail[tem];
};

const sendToMail = async (
  to: string,
  data: any,
  template: TemplatesEmailValues = templatesEmail.verifyEmail,
  subject:string
) => {
  ejs.renderFile(__dirname + "/templatesEjs" + template, data, (err, data) => {
    const mailOptions = {
      from: config.NODEMAILER,
      to: to,
      subject: subject,
      html: data,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Thất bại");
      } else {
        console.log("Thành công");
      }
    });
  });
};

export default sendToMail;
