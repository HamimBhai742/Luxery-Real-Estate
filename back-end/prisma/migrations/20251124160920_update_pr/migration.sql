-- DropIndex
DROP INDEX "bookings_userId_key";

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "isBooked" BOOLEAN NOT NULL DEFAULT false;
