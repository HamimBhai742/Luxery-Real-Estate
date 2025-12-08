/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `providerId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Auth_Provider" AS ENUM ('google', 'creadintial');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "profile" TEXT,
ADD COLUMN     "provider" "Auth_Provider" NOT NULL DEFAULT 'creadintial',
ADD COLUMN     "providerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_providerId_key" ON "users"("providerId");
