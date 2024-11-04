import Link from "next/link";
import { Button } from "./Button";
import { NavLink } from "./NavLink";

export const Header = () => {
    return (
        <header className="w-full h-24 flex justify-between items-center text-white">
            <Link className="font-semibold hover:text-amber-500" href="/">
                Beyond Reviews
            </Link>
            <li className="flex gap-4">
                <ul>
                    <NavLink href="#" text="Books" />
                </ul>
                <ul>
                    <NavLink href="#" text="Movies" />
                </ul>
                <ul>
                    <NavLink href="#" text="Music" />
                </ul>
            </li>
            <Button text="Login" style="amber" />
        </header>
    );
};
