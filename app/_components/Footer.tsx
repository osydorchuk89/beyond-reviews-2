import { NavLink } from "./NavLink";

export const Footer = () => {
    return (
        <footer className="bg-sky-800 h-24 flex items-center justify-between px-48 text-white">
            <span>&copy; Beyond Reviews 2024</span>
            <ul className="flex flex-col items-center sm:flex-row sm:gap-8">
                <li>
                    <NavLink href="#" text="About Us" />
                </li>
                <li>
                    <NavLink href="#" text="Contacts" />
                </li>
                <li>
                    <NavLink href="#" text="Privacy Policy" />
                </li>
            </ul>
        </footer>
    );
};
