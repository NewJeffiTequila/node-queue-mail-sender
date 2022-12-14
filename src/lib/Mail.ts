import nodemailer from "nodemailer";

export default nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a8e6f05feff0d3",
    pass: "91fa5da1d0a3ac",
  },
});
