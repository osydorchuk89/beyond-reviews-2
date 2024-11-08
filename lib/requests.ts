"use server";
import { cache } from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const BASE_URL = "https://api.themoviedb.org/3/movie/";

export const fetchMovies = async (pages: number) => {
    const options = {
        method: "get",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer " + process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN,
        },
    };
    try {
        const moviesData = [];
        for (let num = 1; num <= pages; num++) {
            const response = await axios({
                ...options,
                url: BASE_URL + `popular?page=${num}`,
            });
            for (const movie of response.data.results) {
                const movieResponse = await axios({
                    ...options,
                    url: BASE_URL + movie.id,
                });
                const movieCastResponse = await axios({
                    ...options,
                    url: BASE_URL + movie.id + "/credits",
                });
                const movieData = movieResponse.data;
                const movieCrewData = movieCastResponse.data.crew;
                const movieDirector =
                    movieCrewData.find(
                        (item: any) =>
                            item.job === ("Director" || "Co-Director")
                    )?.name || "Unknown";
                const movieGenres = movieData.genres.map(
                    (item: { id: number; name: string }) => item.name
                );
                const movieReleaseYear = +movieData.release_date.slice(0, 4);
                moviesData.push({
                    title: movieData.title,
                    releaseYear: movieReleaseYear,
                    director: movieDirector,
                    overview: movieData.overview,
                    language: movieData.original_language,
                    genres: movieGenres,
                    runtime: movieData.runtime,
                    avgRating: 0,
                    numRatings: 0,
                    poster: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieData.poster_path}`,
                });
            }
        }
        console.log(moviesData);
        await prisma.movie.createMany({
            data: moviesData,
        });
        console.log("done");
    } catch (error) {
        console.log(error);
    }
};

export const fetchMovieGenres = async () => {
    const options = {
        method: "get",
        url: "https://api.themoviedb.org/3/genre/movie/list",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + process.env.VITE_TMDB_READ_ACCESS_TOKEN,
        },
    };
    try {
        const response = await axios(options);
        const genresArray = response.data.genres;
        const genres: any = {};
        for (const genre of genresArray) {
            genres[genre.id] = genre.name;
        }
        return genres;
    } catch (error) {
        console.log(error);
    }
};

export const getAllMovies = cache(async () => {
    try {
        return await prisma.movie.findMany();
    } catch (error) {
        console.log(error);
    }
});

export const getMovie = cache(async (id: number) => {
    try {
        return await prisma.movie.findUnique({ where: { id } });
    } catch (error) {
        console.log(error);
    }
});
