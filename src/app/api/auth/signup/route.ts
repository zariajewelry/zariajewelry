import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { rateLimit } from "@/middlewares/rate-limiting.middleware";
import logger from "@/utils/logger";
import { signupSchema } from "@/lib/validations";
import { emailService } from "@/lib/email/email-service";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const rateLimitResult = await rateLimit(request, {
    limit: 5, // 5 intentos
    window: 60 * 15, // en 15 minutos
  });

  if (rateLimitResult instanceof NextResponse) {
    logger.warn("Rate limit exceeded for signup attempt");
    return rateLimitResult;
  }

  try {
    const body = await request.json();

    const validationResult = signupSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      logger.info(`Signup validation failed: ${JSON.stringify(errors)}`);

      return NextResponse.json(
        {
          error: "Datos de registro inválidos",
          details: errors,
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, password, acceptNewsletter } =
      validationResult.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logger.info(`Signup attempt with existing email: ${email}`);
      return NextResponse.json(
        {
          error: "Ya existe una cuenta con este email",
          code: "EMAIL_EXISTS",
        },
        { status: 409 }
      );
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`.trim(),
        role: "USER",
        isSubscribedToNewsletter: acceptNewsletter,
        isVerified: false,
        emailVerificationToken: verificationToken,
        emailVerificationExpiry: tokenExpiry,
      },
    });

    logger.info(`New user registered: ${email}`);

    emailService
      .sendVerificationEmail(
        email,
        firstName || lastName || email.split("@")[0],
        verificationToken 
      )
      .catch((err) =>
        logger.error(`Failed to send verification email: ${err}`)
      );

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Usuario creado exitosamente. Por favor verifica tu email.",
        user: userWithoutPassword,
        requiresVerification: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    logger.error(`Error creating user: ${error.message}`);
    console.error("Registration error details:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Ya existe una cuenta con este email" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
