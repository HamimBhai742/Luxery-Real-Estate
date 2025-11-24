/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bookings_userId_key" ON "bookings"("userId");
