import Image from "next/image";

import heroImage from "@/public/images/hero-image.png";
import { Button } from "./Button";

export const HeroSection = () => {
    return (
        <div className="bg-sky-800 flex gap-8 py-24 px-48 text-white">
            <div className="flex flex-col gap-20 w-1/2">
                <p className="text-6xl font-bold">Discover, Review, Connect</p>
                <p>
                    Dive into books, movies, and music with personalized
                    ratings, real user insights, and a community that shares
                    your taste. Find friends, spark conversations, and go{" "}
                    <span className="italic">beyond</span> ordinary reviews!
                </p>
                <div className="flex justify-start">
                    <Button text="Start browsing" style="sky" />
                </div>
            </div>
            <div className="w-1/2">
                <Image
                    src={heroImage}
                    alt="Two people discussing a book they read"
                    className="rounded-xl"
                />
            </div>
        </div>
    );
};
