import { getAllMovies } from "@/lib/requests";
import { Movie } from "@prisma/client";
import { MovieCard } from "./MovieCard";

export const MovieList = async () => {
    const allMovies = await getAllMovies();

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col gap-10 mb-10 items-center">
                {allMovies ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-16 mx-5">
                        {allMovies.map((movie: Movie) => (
                            <MovieCard
                                id={movie.id}
                                key={movie.id}
                                title={movie.title}
                                releaseYear={movie.releaseYear}
                                genres={movie.genres}
                                avgRating={movie.avgRating}
                                numRatings={movie.numRatings}
                                poster={movie.poster}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-start mt-20 h-[50vh]">
                        <p className="text-2xl">No movies found</p>
                    </div>
                )}
            </div>
        </div>
    );
};
