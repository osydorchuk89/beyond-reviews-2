import Link from "next/link";
import { StarIcon } from "./icons/StarIcon";
import slugify from "slugify";

interface MovieCardProps {
    id: string;
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

    return (
        <div className="flex flex-col w-80 justify-start items-center bg-sky-100 rounded-lg shadow-lg p-5">
            <p className="text-center text-xl font-bold h-14 mb-2">
                <Link className="hover:underline" href={`/movies/${slug}`}>
                    {title}
                </Link>
            </p>
            <p className="mb-2 text-sky-800">{mainGenres}</p>
            <p className="mb-2 text-sky-800">{releaseYear}</p>
            <Link href={`/movies/${slug}`}>
                <img src={poster} className="rounded-lg" />
            </Link>
            <div className="flex mt-4">
                <span>
                    <StarIcon className="w-6 h-6 fill-sky-500 border-none" />
                </span>
                <span className="text-sky-800">{avgRating.toPrecision(2)}</span>
                <span className="text-gray-600 ml-5">{numRatings} votes</span>
            </div>
        </div>
    );
};
