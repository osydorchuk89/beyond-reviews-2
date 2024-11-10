import { getAllMovies } from "@/lib/requests";
import { MovieList } from "./_components/MovieList";
import { SearchBar } from "./_components/SearchBar";
import { SortFilterBar } from "./_components/SortFilterBar";
import { sideBarFilterList, sideBarSortList } from "@/lib/data";

export default async function MainMoviesPage(props: {
    searchParams?: Promise<{
        query?: string;
        filter?: string;
        sort?: string;
    }>;
}) {
    let allMovies = await getAllMovies();

    if (!allMovies) {
        allMovies = [];
    }

    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const filter = searchParams?.filter || "";
    const sort = searchParams?.sort || "";

    if (query) {
        allMovies = allMovies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    switch (sort) {
        case "oldest":
            allMovies = allMovies.sort((a, b) => a.releaseYear - b.releaseYear);
            break;
        case "newest":
            allMovies = allMovies.sort((a, b) => b.releaseYear - a.releaseYear);
            break;
        case "highestRating":
            allMovies = allMovies.sort((a, b) => b.avgRating - a.avgRating);
            break;
        case "mostVotes":
            allMovies = allMovies.sort((a, b) => b.numRatings - a.numRatings);
            break;
        case "":
            allMovies = allMovies.sort((a, b) => b.releaseYear - a.releaseYear);
            break;
        default:
            allMovies = allMovies.sort((a, b) => b.releaseYear - a.releaseYear);
    }

    if (filter?.startsWith("year")) {
        const year = +filter.split("-")[1];
        allMovies = allMovies.filter((item) => item.releaseYear === year);
    } else if (filter?.startsWith("genre")) {
        const genre = filter.split("-")[1];
        allMovies = allMovies.filter((item) => item.genres.includes(genre));
    } else if (filter?.startsWith("director")) {
        const director = filter.split("-")[1];
        allMovies = allMovies.filter((item) => item.director === director);
    }

    return (
        <div className="flex flex-col w-full">
            <p className="text-4xl text-center font-bold py-10 mb-5">
                Popular Movies
            </p>
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="flex flex-col w-5/6 md:w-1/4 ml-5 gap-8 mb-5">
                    <SearchBar />
                    <SortFilterBar
                        itemsList={sideBarSortList}
                        elementType="sort"
                    />
                    <SortFilterBar
                        itemsList={sideBarFilterList}
                        elementType="filter"
                    />
                </div>
                <div className="flex flex-col w-full md:w-3/4">
                    <MovieList movies={allMovies} />
                </div>
            </div>
        </div>
    );
}
