import NextAuth, { Session, type AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/db';
import { type JWT } from 'next-auth/jwt';
import config from '@/config';
import logger from '@/utils/logger';

interface CustomJWT extends JWT {
  id?: string;
  role?: string;
}


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: config.oauth.google.clientSecret,
  providers: [
    GoogleProvider({
      clientId: config.oauth.google.clientId,
      clientSecret: config.oauth.google.clientSecret,
    }),
    CredentialsProvider({
        name: "EmailPassword",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) return null;
  
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
  
          if (!user || !user.password) return null;
  
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;
  
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          };
        }
      }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async jwt({ token, user }: { token: CustomJWT; user?: any }): Promise<CustomJWT> {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'USER';
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: CustomJWT }): Promise<Session> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id, 
          role: token.role, 
        } as Session["user"],  
      };
    },
  },
  events: {
    async signIn(message) {
      logger.info(`User ${message.user.email} signed in`);
    },
    async signOut(message) {
      logger.info(`User ${message.token.email} signed out`);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };