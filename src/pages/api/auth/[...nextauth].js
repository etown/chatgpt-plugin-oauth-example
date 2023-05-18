import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // In this example we just ignore the password and create a user
        let user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              username: credentials.username,
            },
          });
        }

        if (user) {
          return { id: user.id, name: user.username };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id
      return session
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.id = account.providerAccountId
      }
      return token
    }
  }
})