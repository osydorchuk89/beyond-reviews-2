"use client";

import { useState } from "react";

import { Movie } from "@prisma/client";
import { MovieCard } from "./MovieCard";
import { Button } from "@/app/components/Button";

export const MovieList = ({ movies }: { movies: Movie[] }) => {
    const [numberMovies, setNumberMovies] = useState(15);

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col gap-10 mb-10 items-center">
                {movies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-16 mx-5">
                            {movies
                                .slice(0, numberMovies)
                                .map((movie: Movie) => (
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
                        {numberMovies < movies.length && (
                            <div className="flex justify-center mb-10">
                                <Button
                                    text="LOAD MORE"
                                    style="sky"
                                    handleClick={() =>
                                        setNumberMovies(
                                            (prevState) => prevState + 15
                                        )
                                    }
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex justify-center items-start mt-20 h-[50vh]">
                        <p className="text-2xl">No movies found</p>
                    </div>
                )}
            </div>
        </div>
    );
};
