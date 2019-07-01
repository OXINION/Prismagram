import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

 const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options))
  return client.sendMail(email)
};

export const sendSecretmail = (adress, secret) => {
  const email = {
    from: "info@oxinion.com",
    to: adress,
    subject: "🔒Login Secret for OXINION🔒",
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the website/app to log in`
  };
  return sendMail(email)
};
