-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SELLER', 'DEALER');

-- AlterTable
ALTER TABLE "Dealer" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'DEALER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'SELLER';
