import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/User";
import connect from "@/utils/db";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Enter your Email", type: "text" },
        password: { label: "Enter your Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();

        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account }: { user: AuthUser; account: Account }) {
  //     if (account?.provider == "credentials") {
  //       return true;
  //     }
  //     if (account?.provider == "github") {
  //       await connect();
  //       try {
  //         const existingUser = await User.findOne({ email: user.email });
  //         if (!existingUser) {
  //           const newUser = new User({
  //             email: user.email,
  //           });

  //           await newUser.save();
  //           return true;
  //         }
  //         return true;
  //       } catch (err) {
  //         console.log("Error saving user", err);
  //         return false;
  //       }
  //     }
  //   },
  // },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
