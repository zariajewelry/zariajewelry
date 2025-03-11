import NextAuth, { type AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/db';
import config from '@/config';
import logger from '@/utils/logger';



export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: config.nextAuth.secret,
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
            fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || null,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
          };
        }
      }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, 
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'USER';
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      };
    },
  },
  events: {
    async signIn(message) {
      logger.info(`User ${message.user.email} signed in`);
      
      if (message.account?.provider === "google" && message.user.name) {

        await prisma.user.update({
          where: { id: message.user.id },
          data: { 
            firstName: message.user.name?.split(' ')[0] || '',
            lastName: message.user.name?.split(' ').slice(1).join(' ') || '',
            isVerified: true,
            emailVerified: new Date(),
            emailVerificationToken: null,
            emailVerificationExpiry: null
          }
        });
      }
    },
    
    async createUser(message) {
      if (message.user.email && message.user.emailVerified) {
        const nameParts = message.user.name?.split(' ') || [''];
        
        await prisma.user.update({
          where: { id: message.user.id },
          data: { 
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            isVerified: true,
          }
        });
      }
    },
    async signOut(message) {
      logger.info(`User ${message.token.email} signed out`);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };