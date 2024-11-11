import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/Header";
import { Footer } from "./_components/Footer";
import { auth } from "@/auth";
import { InfoBarWrapper } from "./_components/InfoBarWrapper";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Providers } from "./StoreProvider";

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

    return (
        <Providers>
            <html lang="en">
                <body>
                    <Header isAuthenticated={session ? true : false} />
                    <InfoBarWrapper />
                    {children}
                    <Footer />
                </body>
            </html>
        </Providers>
    );
}
