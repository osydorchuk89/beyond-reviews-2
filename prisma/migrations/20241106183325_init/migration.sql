-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "releaseYear" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "genres" TEXT[],
    "runtime" INTEGER NOT NULL,
    "avgVote" DOUBLE PRECISION NOT NULL,
    "numVotes" INTEGER NOT NULL,
    "poster" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
