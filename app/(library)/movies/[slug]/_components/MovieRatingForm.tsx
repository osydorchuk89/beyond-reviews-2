import { NavLink } from "@/app/_components/NavLink";
import { Movie } from "@prisma/client";

export const MovieRatingForm = ({ movie }: { movie: Movie }) => {
    return (
        <div>
            <div className="bg-amber-200 rounded-lg shadow-lg p-5">
                {/* {authStatus!.isAuthenticated && (!hasRated || isEditing) && (
                    <form
                        noValidate
                        onSubmit={handleSubmit((data) => {
                            mutate(data);
                            reset();
                        })}
                    >
                        <p className="font-bold">Rate the movie:</p>
                        <div className="flex">
                            {[...Array(10).keys()].map((index) => {
                                index += 1;
                                return (
                                    <div key={index}>
                                        <StarIcon
                                            className={
                                                index <= (hover || rating)
                                                    ? starClassName +
                                                      " fill-amber-500"
                                                    : starClassName +
                                                      " fill-amber-200"
                                            }
                                            handleClick={() => {
                                                setValue("movieRating", index, {
                                                    shouldValidate: true,
                                                });
                                                setRating(index);
                                            }}
                                            handleMouseEnter={() =>
                                                setHover(index)
                                            }
                                            handleMouseLeave={() =>
                                                setHover(rating)
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-red-800">
                            {errors.movieRating?.message}
                        </p>
                        <div className="my-5">
                            <label htmlFor="movie-review" className="font-bold">
                                Post your review (optional):
                            </label>
                            <textarea
                                {...register("movieReview")}
                                id="movie-review"
                                name="movieReview"
                                placeholder="Type your review here"
                                className="resize-none border border-gray-700 focus:border-amber-900 p-2 rounded-md"
                                rows={5}
                                cols={70}
                            />
                        </div>
                        {isEditing ? (
                            <div className="flex gap-10">
                                <Button
                                    style="dark"
                                    type="submit"
                                    text="EDIT"
                                />
                                <Button
                                    style="dark"
                                    text="CANCEL"
                                    handleClick={() => setIsEditing(false)}
                                />
                            </div>
                        ) : (
                            <Button style="dark" type="submit" text="RATE" />
                        )}
                    </form>
                )}
                {authStatus!.isAuthenticated && hasRated && !isEditing && (
                    <div className="flex flex-col gap-5">
                        <div>
                            <span className="font-bold">
                                Your rating:{" "}
                                <span className="font-normal">
                                    {userRating}/10
                                </span>
                            </span>
                        </div>
                        <div>
                            {" "}
                            <p className="font-bold">Your review: </p>
                            <p
                                ref={ref}
                                className={!isShowingMore ? "line-clamp-5" : ""}
                            >
                                {userReview || "N/A"}
                            </p>
                            {isTruncated && (
                                <div>
                                    <Button
                                        style="mt-1 text-green-700 hover:text-green-950 text-base font-medium uppercase"
                                        text={
                                            isShowingMore
                                                ? "Show less"
                                                : "Show more"
                                        }
                                        handleClick={toggleIsShowingMore}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-start">
                            <Button
                                text="EDIT YOUR RATING"
                                style="dark"
                                handleClick={editUserRating}
                            />
                        </div>
                    </div>
                )} */}
                {/* {!authStatus!.isAuthenticated && ( */}
                <p className="px-4 py-2">
                    To rate the movie or post a review, please{" "}
                    <span className="font-semibold">
                        <NavLink href="#" text="login to your account" />
                    </span>
                </p>
                {/* )} */}
            </div>
        </div>
    );
};
