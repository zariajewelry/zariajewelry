import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { emailService } from "@/lib/email/email-service";
import logger from "@/utils/logger";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: "Email requerido" },
        { status: 400 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        name: true,
        email: true,
        emailVerified: true,
        isVerified: true
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { message: "Si el email existe, se ha enviado un enlace de verificación" },
        { status: 200 }
      );
    }
    
    if (user.emailVerified || user.isVerified) {
      return NextResponse.json(
        { error: "El email ya está verificado", code: "ALREADY_VERIFIED" },
        { status: 400 }
      );
    }
    
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); 
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: verificationToken,
        emailVerificationExpiry: tokenExpiry,
      },
    });
    
    
    const userName = user.firstName || user.name || user.email!.split('@')[0];
    const success = await emailService.sendVerificationEmail(
        email, 
        userName, 
        verificationToken
      );
    
    if (success) {
      logger.info(`Verification email resent to: ${email}`);
      return NextResponse.json(
        { message: "Email de verificación reenviado" },
        { status: 200 }
      );
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error: any) {
    logger.error(`Error resending verification email: ${error.message}`);
    return NextResponse.json(
      { error: "Error al reenviar el email de verificación" },
      { status: 500 }
    );
  }
}