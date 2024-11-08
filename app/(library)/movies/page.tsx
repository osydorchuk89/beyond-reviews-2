import { getAllMovies } from "@/lib/requests";
import { MovieList } from "./components/MovieList";

export default async function MainMoviePage() {
    let allMovies = await getAllMovies();

    if (!allMovies) {
        allMovies = [];
    }

    return (
        <div className="bg-white text-sky-950 font-bold py-10">
            <p className="text-4xl text-center mb-10">Popular Movies</p>
            <MovieList movies={allMovies} />
        </div>
    );
}
