// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// TODO: Set up Prisma database for actual authentication
// For now, this is a stub. Replace with real database auth when DATABASE_URL is configured.

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      // TODO: Replace with real database lookup
      async authorize(credentials) {
        // Temporary stub - returns null (no auth) until database is configured
        // In production, uncomment Prisma code above and implement proper auth
        return null;
      }
    })
  ],
  // We will use JWT for session management
  session: {
    strategy: 'jwt',
  },
  // Secret for signing the JWT
  secret: process.env.NEXTAUTH_SECRET,
  // Custom pages for login, etc. (optional)
  pages: {
    signIn: '/login',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
