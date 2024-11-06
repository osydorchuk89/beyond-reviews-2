/*
  Warnings:

  - You are about to drop the column `avgVote` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `numVotes` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `avgRating` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numRatings` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "avgVote",
DROP COLUMN "numVotes",
ADD COLUMN     "avgRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "numRatings" INTEGER NOT NULL;
