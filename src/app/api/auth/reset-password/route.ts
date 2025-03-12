import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import logger from "@/utils/logger";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { rateLimit } from "@/middlewares/rate-limiting.middleware";
import { validatePassword } from "@/lib/validations";


export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, {
      limit: 5,     // 5 intentos
      window: 60 * 15 // en una ventana de 15 minutos
    });

    if (rateLimitResult instanceof NextResponse) {
      return rateLimitResult;
    }
    
    const { token, password } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: "Token requerido" },
        { status: 400 }
      );
    }
    
    const passwordError = validatePassword(password);
    if (passwordError) {
      return NextResponse.json(
        { error: passwordError },
        { status: 400 }
      );
    }
    
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
      
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken,
        resetPasswordExpire: {
          gt: new Date()
        }
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Token inválido o expirado" },
        { status: 400 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpire: null
      }
    });
    
    logger.info(`Password reset successful for user: ${user.email}`);
    return NextResponse.json(
      { message: "Contraseña actualizada correctamente" },
      { status: 200 }
    );
    
  } catch (error: any) {
    logger.error(`Error in reset password: ${error.message}`);
    return NextResponse.json(
      { error: "No se pudo procesar la solicitud" },
      { status: 500 }
    );
  }
}