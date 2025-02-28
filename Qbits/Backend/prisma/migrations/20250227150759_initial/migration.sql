-- CreateEnum
CREATE TYPE "SellerRole" AS ENUM ('ORGANISATION', 'INDIVIDUAL');

-- CreateEnum
CREATE TYPE "ScrapMaterial" AS ENUM ('ALUMINUM', 'STEEL', 'COPPER', 'PLASTIC', 'GLASS', 'WOOD', 'PAPER', 'RUBBER', 'TEXTILE', 'OTHER');

-- CreateEnum
CREATE TYPE "ItemStatus" AS ENUM ('PENDING', 'PICKED', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "permAddress" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "itemsSold" INTEGER,
    "itemsPublish" INTEGER,
    "sellerRole" "SellerRole" NOT NULL DEFAULT 'INDIVIDUAL',
    "orgName" TEXT,
    "orgAddress" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Dealer" (
    "dealerId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "permAddress" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "orgName" TEXT NOT NULL,
    "orgAddress" TEXT NOT NULL,
    "gstNo" TEXT NOT NULL,
    "licNum" TEXT NOT NULL,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("dealerId")
);

-- CreateTable
CREATE TABLE "Item" (
    "itemId" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "dealer_id" TEXT,
    "pictures" TEXT[],
    "description" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "material" "ScrapMaterial" NOT NULL,
    "pickUpAddress" TEXT NOT NULL,
    "pickUpTime" TIMESTAMP(3) NOT NULL,
    "status" "ItemStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dealerId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "trackingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_phone_key" ON "Dealer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_email_key" ON "Dealer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_gstNo_key" ON "Dealer"("gstNo");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_licNum_key" ON "Dealer"("licNum");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_itemId_key" ON "Transaction"("itemId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_dealer_id_fkey" FOREIGN KEY ("dealer_id") REFERENCES "Dealer"("dealerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_dealerId_fkey" FOREIGN KEY ("dealerId") REFERENCES "Dealer"("dealerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;
