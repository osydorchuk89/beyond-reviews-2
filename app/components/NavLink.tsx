import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

interface NavLinkProps {
    href: Url;
    text: string;
}

export const NavLink = ({ href, text }: NavLinkProps) => {
    return (
        <Link className="hover:text-amber-500" href={href}>
            {text}
        </Link>
    );
};
