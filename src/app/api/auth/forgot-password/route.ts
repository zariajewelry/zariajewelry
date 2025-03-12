import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { emailService } from "@/lib/email/email-service";
import logger from "@/utils/logger";
import crypto from "crypto";
import { rateLimit } from "@/middlewares/rate-limiting.middleware";

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, {
      limit: 5,
      window: 60 * 15,
    });

    if (rateLimitResult instanceof NextResponse) {
      return rateLimitResult;
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      logger.info(`Password reset requested for non-existent email: ${email}`);
      return NextResponse.json(
        {
          message:
            "Si el email existe, recibirás instrucciones para restablecer tu contraseña",
        },
        { status: 200 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken,
        resetPasswordExpire,
      },
    });

    const userName = user.firstName || user.name || user.email!.split("@")[0];

    const success = await emailService.sendPasswordResetEmail(
      user.email!,
      userName,
      resetToken
    );

    if (!success) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetPasswordToken: null,
          resetPasswordExpire: null,
        },
      });

      throw new Error("Error sending email");
    }

    logger.info(`Password reset email sent to: ${email}`);
    return NextResponse.json(
      {
        message:
          "Si el email existe, recibirás instrucciones para restablecer tu contraseña",
        headers: rateLimitResult.headers,
      },
      { status: 200 }
    );
  } catch (error: any) {
    logger.error(`Error in forgot password: ${error.message}`);
    return NextResponse.json(
      { error: "No se pudo procesar la solicitud" },
      { status: 500 }
    );
  }
}
