import nodemailer from "nodemailer";
import { config } from "@/config";

interface EmailPayload {
  to: string;
  content: string;
  subject: string;
}

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
});

export async function sendEmail({ to, content, subject }: EmailPayload) {
  return new Promise((resolve, reject) => {
    transport.sendMail(
      {
        to,
        subject,
        html: content,
        from: "suporte@encontre.com.br",
      },
      (error, data) => (error ? reject(error) : resolve(data))
    );
  });
}
