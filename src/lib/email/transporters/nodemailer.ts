import nodemailer from "nodemailer";
import { EmailOptions, EmailTransporter } from "../types";
import config from "@/config";
import logger from "@/utils/logger";

export class NodemailerTransporter implements EmailTransporter {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host, 
      port: config.email.port,
      secure: false,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });

    this.verifyConnection();
  }

  private async verifyConnection() {
    try {
      await this.transporter.verify();
      logger.info("Email service connected successfully");
    } catch (error) {
      logger.error(`Failed to connect to email service: ${error}`);
    }
  }

  async sendMail(options: EmailOptions): Promise<any> {
    try {
      const info = await this.transporter.sendMail({
        from: options.from || `"ZARIA Jewelry" <${config.email.from}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });

      logger.info(`Email sent: ${info.messageId}`);
      if (process.env.NODE_ENV !== "production") {
        logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      }

      return info;
    } catch (error: any) {
      logger.error(`Error sending email: ${error.message}`);
      throw error;
    }
  }
}

export default new NodemailerTransporter();
