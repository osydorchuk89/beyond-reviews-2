import { NavLink } from "@/app/_components/NavLink";
import { Movie } from "@prisma/client";
import { StarIcon } from "../../_components/icons/StarIcon";

export const MovieAdditionalInfo = ({ movie }: { movie: Movie }) => {
    return (
        <div className="flex flex-col gap-5 text-lg mb-5 relative">
            {/* <div className="absolute w-40 top-0 right-0 flex flex-col justify-center items-center transition-opacity">
                <BookMarkIcon
                    color={iconFilled ? "#f59e0b" : "#ffffff"}
                    handleMouseEnter={() => {
                        hasSaved ? setIconFilled(false) : setIconFilled(true);
                    }}
                    handleMouseLeave={() => {
                        hasSaved ? setIconFilled(true) : setIconFilled(false);
                    }}
                    handleClick={saveMovie}
                />
                <div
                    className={
                        (iconFilled && !hasSaved) || (!iconFilled && hasSaved)
                            ? toolTipStyle
                            : toolTipStyle + " invisible"
                    }
                >
                    {!hasSaved ? "Add to watchlist" : "Remove from watchlist"}
                </div>
            </div> */}
            <p className="font-semibold">
                Directed by: <NavLink href="#" text={movie.director} />
            </p>
            <p>{movie.releaseYear}</p>
            <p>
                {movie.genres.slice(0, -1).map((item) => (
                    <span key={item}>
                        <NavLink href="/movies" text={item} /> |{" "}
                    </span>
                ))}
                <NavLink href="/movies" text={movie.genres.at(-1)!} />
            </p>
            <div className="flex gap-5 text-gray-600 ">
                <span>{movie.runtime} min</span>
                <span className="flex">
                    <StarIcon className="w-6 h-6 fill-sky-500 border-none" />{" "}
                    {movie.avgRating}
                </span>
                <span>
                    {movie.numRatings}{" "}
                    {movie.numRatings === 1 ? "vote" : "votes"}
                </span>
            </div>
            <p>{movie.overview}</p>
        </div>
    );
};
