"use client";
import Link from "next/link";

import { Button } from "./Button";
// import { fetchMovies } from "@/lib/requests";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
    const path = usePathname();
    const router = useRouter();
    const headerClassName =
        "w-full bg-sky-800 h-24 flex justify-between items-center text-white px-48";

    return (
        <header
            className={
                path === "/"
                    ? headerClassName
                    : headerClassName + " sticky top-0 z-10"
            }
        >
            <Link
                className="text-xl font-semibold hover:text-amber-500"
                href="/"
            >
                Beyond Reviews
            </Link>
            <li className="flex gap-8">
                <ul>
                    <Link className="hover:text-amber-500" href="/">
                        Books
                    </Link>
                </ul>
                <ul>
                    <Link className="hover:text-amber-500" href="/movies">
                        Movies
                    </Link>
                </ul>
                <ul>
                    <Link className="hover:text-amber-500" href="/">
                        Music
                    </Link>
                </ul>
            </li>
            <Button
                text="Login"
                style="amber"
                // handleClick={() => fetchMovies(10)}
                handleClick={() => router.push("/login")}
            />
        </header>
    );
};