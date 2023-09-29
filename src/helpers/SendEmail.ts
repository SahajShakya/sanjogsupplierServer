import nodemailer from "nodemailer";
import { emailConfig } from "./emailconfig";
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

export const sendEmail = async ({
  to,
  subject,
  html,
  from = emailConfig.smtpOptions.auth.user,
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) => {

  const oauth2Client = new OAuth2(
    emailConfig.smtpOptions.clientId,
    emailConfig.smtpOptions.clientSecret,
  );

  oauth2Client.setCredentials({
    refresh_token: emailConfig.smtpOptions.refresh_token,

  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject('Fail to get the accesss Token');
      }
      resolve(token);
    })
  })

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    type: 'OAuth2',
    user: emailConfig.smtpOptions.auth.user,
    clientId: emailConfig.smtpOptions.clientId,
    clientSecret: emailConfig.smtpOptions.clientSecret,
    refreshToken: emailConfig.smtpOptions.refresh_token,
    //accessToken: oauth2Client.getAccessToken(),
  },
  });
  console.log("Sending email...");
  await transporter.sendMail({ to, subject, html });
  console.log("Email sent.");
};
