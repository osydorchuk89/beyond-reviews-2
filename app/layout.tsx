import type { Metadata } from "next";
import "./globals.css";

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
            <body>{children}</body>
        </html>
    );
}
