import Link from "next/link";
import slugify from "slugify";

import { StarIcon } from "./icons/StarIcon";

interface MovieCardProps {
    id: number;
    title: string;
    releaseYear: number;
    genres: string[];
    avgRating: number;
    numRatings: number;
    poster: string;
}

export const MovieCard = ({
    id,
    title,
    releaseYear,
    genres,
    avgRating,
    numRatings,
    poster,
}: MovieCardProps) => {
    const mainGenres =
        genres.length > 1 ? `${genres[0]} | ${genres[1]}` : genres[0];
    const slug = slugify(`${id} ${title} ${releaseYear}`, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
    });

    const displayedTitle =
        title?.length > 45 ? `${title.substring(0, 45)}...` : title;

    return (
        <div className="flex flex-col w-80 justify-start items-center bg-sky-100 rounded-lg shadow-lg p-5 relative">
            <p className="w-full text-center text-xl font-bold h-16 bg-sky-700 rounded-t-lg flex justify-center items-center absolute top-0 p-4">
                <Link
                    className="hover:underline text-sky-50"
                    href={`/movies/${slug}`}
                >
                    {displayedTitle}
                </Link>
            </p>
            <p className="mb-2 text-sky-950 mt-16">{mainGenres}</p>
            <p className="mb-2 text-sky-950">{releaseYear}</p>
            <Link href={`/movies/${slug}`}>
                <img src={poster} className="rounded-lg" />
            </Link>
            <div className="flex mt-4">
                <span>
                    <StarIcon className="w-6 h-6 fill-sky-500 border-none" />
                </span>
                <span className="text-sky-950">{avgRating.toPrecision(2)}</span>
                <span className="text-gray-600 ml-5">{numRatings} votes</span>
            </div>
        </div>
    );
};
