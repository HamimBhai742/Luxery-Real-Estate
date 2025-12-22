/*
  Warnings:

  - A unique constraint covering the columns `[propertyId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "propertyId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reviews_propertyId_key" ON "reviews"("propertyId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
