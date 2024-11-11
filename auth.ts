import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    let user = null;
                    const { email, password } = <
                        { email: string; password: string }
                    >credentials;

                    user = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (!user) {
                        // throw new Error("Invalid credentials.");
                        return null;
                    }

                    const passwordCorrect = await bcryptjs.compare(
                        password,
                        user.password
                    );

                    if (!passwordCorrect) {
                        // throw new Error("Invalid credentials.");
                        return null;
                    }

                    return user;
                } catch (error) {
                    return null;
                }
            },
        }),
        Google,
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (account!.provider === "google") {
                const user = await prisma.user.findUnique({
                    where: { email: profile?.email as string },
                });
                if (!user) {
                    const newUserData = {
                        firstName: profile?.given_name as string,
                        lastName: profile?.family_name as string,
                        email: profile?.email as string,
                        password: "",
                        photo: profile?.picture as string,
                    };
                    try {
                        await prisma.user.create({ data: newUserData });
                    } catch (error) {
                        return {
                            error: "Cannot save new user",
                        };
                    }
                }
                return true;
            }
            return true;
        },
    },
    debug: process.env.NODE_ENV === "development",
});
