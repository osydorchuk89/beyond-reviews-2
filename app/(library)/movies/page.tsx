import { MovieList } from "./components/MovieList";

export default function MainMoviePage() {
    return (
        <div className="bg-white text-sky-900 font-bold py-10">
            <p className="text-4xl text-center mb-10">Popular Movies</p>
            <MovieList />
        </div>
    );
}
