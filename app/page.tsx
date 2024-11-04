import Image from "next/image";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";

export default function Home() {
    return (
        <div className="bg-sky-800 px-48 text-white">
            <Header />
            <HeroSection />
        </div>
    );
}
