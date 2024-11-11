"use server";
import { cache } from "react";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

import { UserSchema } from "./schemas";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

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

export const sendRegistrationData = async (
    prevState: any,
    formData: FormData
) => {
    const registrationData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        photo: formData.get("photo"),
    };

    if ((registrationData.photo as File).size === 0) {
        (registrationData.photo as string) =
            "https://beyond-reviews-os.s3.eu-central-1.amazonaws.com/user-icon.png";
    }

    const validationResult = UserSchema.safeParse(registrationData);
    let validationErrors = validationResult.error?.flatten().fieldErrors;
    if (!validationResult.success) {
        return {
            errors: validationErrors!,
            payload: registrationData,
        };
    }

    const validatedData = validationResult.data;
    const userExists = await prisma.user.findUnique({
        where: {
            email: validatedData.email,
        },
    });
    if (userExists) {
        validationErrors = {
            ...validationErrors,
            email: ["User with this email already exists"],
        };
        return {
            errors: validationErrors,
            payload: registrationData,
        };
    } else {
        const hashedPassword = await bcryptjs.hash(validatedData.password, 12);
        validatedData.password = hashedPassword;
        try {
            await prisma.user.create({
                data: validatedData,
            });
        } catch (error: any) {
            console.log(error);
        }
    }
};

export const loginWithCredentials = async (
    prevState: any,
    formData: FormData
) => {
    try {
        await signIn("credentials", formData);
        return {
            error: null,
            payload: {
                email: null,
                password: null,
            },
        };
    } catch (error: any) {
        switch (error.type) {
            case "CredentialsSignin":
                return {
                    error: "Invalid credentials",
                    payload: {
                        email: formData.get("email"),
                        password: formData.get("password"),
                    },
                };
            case undefined:
                redirect("/");
            default:
                return {
                    error: "Something went wrong",
                    payload: {
                        email: formData.get("email"),
                        password: formData.get("password"),
                    },
                };
        }
    }
};

export const loginWithGoogle = async () => {
    await signIn("google");
};
