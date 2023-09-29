import nodemailer from "nodemailer";
import pug from "pug";
import { convert } from "html-to-text";
import { Users } from "../../models/users";

const smtp = {
  host: process.env.EMAIL_HOST as string,
  port: Number(process.env.EMAIL_PORT as string),
  user: process.env.EMAIL_USER as string,
  pass: process.env.EMAIL_PASS as string,
};

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default class Email {
  emailFrom: string;

  constructor(readonly user: UserProps, private url: string) {
    this.user = user
    this.emailFrom = `SanjogSupplier <shakyaniwash@outlook.com>`;
  }

  private newTransport() {
    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/../../views/${template}.pug`, {
      firstName: this.user.firstName ?? "",
      lastName: this.user.lastName ?? "",
      email: this.user.email ?? "",
      password: this.user.password ?? "",
      subject,
      url: this.url,
    });

    // Create mailOptions
    const mailOptions = {
      from: this.emailFrom,
      to: this.user.email,
      subject,
      text: convert(html),
      html,
    };
    // Send email
    const info = await this.newTransport().sendMail(mailOptions);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendVerificationCode() {
    await this.send("verificationCode", "Your account verification code");
  }

  async sendPasswordResetToken() {
    await this.send(
      "resetPassword",
      "Your password reset token (valid for only 3 days)"
    );
  }

  async sendUserCreate() {
    await this.send("newUserCreated", "Your user has been created");
  }
}
