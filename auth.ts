import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/schemas";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    let user = null;

                    const { email, password } = await LoginSchema.parseAsync(
                        credentials
                    );

                    // logic to verify if the user exists
                    user = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (!user) {
                        // No user found, so this is their first attempt to login
                        // Optionally, this is also the place you could do a user registration
                        throw new Error("Invalid credentials.");
                    }

                    const passwordCorrect = await bcryptjs.compare(
                        password,
                        user.password
                    );

                    if (!passwordCorrect) {
                        // No user found, so this is their first attempt to login
                        // Optionally, this is also the place you could do a user registration
                        throw new Error("Invalid credentials.");
                    }

                    // return user object with their profile data
                    return user;
                } catch (error) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        return null;
                    }
                }
            },
            secret: process.env.AUTH_SECRET,
            pages: {
                signIn: "/login",
            },
            debug: process.env.NODE_ENV === "development",
        }),
    ],
});
