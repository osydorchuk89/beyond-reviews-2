import { getMovie } from "@/lib/requests";
import { MovieMainInfo } from "./_components/MovieMainInfo";
import { MovieAdditionalInfo } from "./_components/MovieAdditionalInfo";
import { MovieRatingForm } from "./_components/MovieRatingForm";

export default async function MoviePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const movieId = +(await params).slug.split("-")[0];
    const movie = await getMovie(movieId);
    if (!movie) {
        return undefined;
    }
    return (
        <div className="flex flex-col mx-48 text-sky-950">
            <div className="flex gap-10 py-10">
                <MovieMainInfo movie={movie} />
                <div className="flex flex-col w-2/3 text-lg mt-2">
                    <MovieAdditionalInfo movie={movie} />
                    <MovieRatingForm movie={movie} />
                </div>
            </div>
            {/* <MovieReviews /> */}
        </div>
    );
}
