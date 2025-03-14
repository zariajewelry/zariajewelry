import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import logger from "@/utils/logger";
import config from "@/config/env";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    
    if (!token) {
      logger.warn('Verification attempt without token');
      return NextResponse.redirect(new URL('/auth/verification-error', config.app.clientUrl));
    }
    
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationExpiry: {
          gt: new Date() 
        }
      }
    });
    
    if (!user) {
      logger.warn(`Invalid or expired verification token: ${token.substring(0, 10)}...`);
      return NextResponse.redirect(new URL('/auth/verification-error', config.app.clientUrl));
    }
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        emailVerified: new Date(),
        emailVerificationToken: null,
        emailVerificationExpiry: null
      }
    });
    
    logger.info(`User verified successfully: ${user.email}`);
    
    const successUrl = new URL('/auth/verification-success', config.app.clientUrl);
    return NextResponse.redirect(successUrl);
    
  } catch (error: any) {
    logger.error(`Verification error: ${error.message}`);
    return NextResponse.redirect(new URL('/auth/verification-error', config.app.clientUrl));
  }
}