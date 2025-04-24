import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP server
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });
  }
  
  // Function to send email
  async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.transporter.sendMail({
        from: '"Target Industry" <no-reply@yourapp.com>',
        to,
        subject,
        text,
      });
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
