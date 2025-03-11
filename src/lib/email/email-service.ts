import { EmailService, EmailOptions } from './types';
import nodemailerTransporter from './transporters/nodemailer';
import { createVerificationTemplate } from './templates/verification';
import logger from '@/utils/logger';
import { generateToken } from '../auth';
import { prisma } from '@/lib/db';

class EmailServiceImpl implements EmailService {
  private transporter = nodemailerTransporter;
  
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      await this.transporter.sendMail(options);
      return true;
    } catch (error) {
      logger.error(`Failed to send email: ${error}`);
      return false;
    }
  }
  
  async sendVerificationEmail(
    email: string, 
    userName: string, 
    existingToken?: string 
  ): Promise<boolean> {
    try {
      const verificationToken = existingToken || await generateToken();
      
      if (!existingToken) {
        await this.saveVerificationToken(email, verificationToken);
      }
  
      const template = createVerificationTemplate(userName, verificationToken);
      
      return await this.sendEmail({
        to: email,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });
    } catch (error) {
      logger.error(`Error sending verification email: ${error}`);
      return false;
    }
  }
  
  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    // Implementación similar a sendVerificationEmail
    // ...
    return true;
  }
  
  private async saveVerificationToken(email: string, token: string): Promise<void> {
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    try {
      await prisma.user.update({
        where: { email },
        data: {
          emailVerificationToken: token,
          emailVerificationExpiry: tokenExpiry,
        }
      });
      
      logger.info(`Verification token saved for email: ${email}`);
    } catch (error) {
      logger.error(`Failed to save verification token: ${error}`);
      throw error; 
    }
  }
}

export const emailService = new EmailServiceImpl();