"use client";
import Link from "next/link";

import { Button } from "./Button";
import { NavLink } from "./NavLink";
import { fetchMovies } from "@/lib/requests";
import { usePathname } from "next/navigation";

export const Header = () => {
    const path = usePathname();
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
                    <NavLink href="#" text="Books" />
                </ul>
                <ul>
                    <NavLink href="/movies" text="Movies" />
                </ul>
                <ul>
                    <NavLink href="#" text="Music" />
                </ul>
            </li>
            <Button
                text="Login"
                style="amber"
                handleClick={() => fetchMovies(10)}
            />
        </header>
    );
};
