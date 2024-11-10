import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { auth } from "@/auth";

export const metadata: Metadata = {
    title: "Beyond Reviews",
    description: "Discover, Review, Connect",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    console.log(session);

    return (
        <html lang="en">
            <body>
                <Header isAuthenticated={session ? true : false} />
                {children}
                <Footer />
            </body>
        </html>
    );
}
