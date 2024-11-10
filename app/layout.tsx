import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";

export const metadata: Metadata = {
    title: "Beyond Reviews",
    description: "Discover, Review, Connect",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
