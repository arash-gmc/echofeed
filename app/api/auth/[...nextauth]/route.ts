import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import nextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const nextauthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Suci",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credential, req) {
        let user = await prisma.user.findUnique({
          where: { email: credential?.email },
        });
        if (!user) {
          user = await prisma.user.findUnique({
            where: { username: credential?.email },
          });
        }

        if (!user) return null;
        const isPasswordMatch = await bcrypt.compare(
          credential!.password,
          user.hashedPassword
        );
        if (isPasswordMatch) return user;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;

      return session;
    },
  },
};

const handler = nextAuth(nextauthConfig);

export { handler as GET, handler as POST };
