/*
  Warnings:

  - A unique constraint covering the columns `[vatNumber]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ordreNr]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "customerNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_vatNumber_key" ON "Customer"("vatNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Order_ordreNr_key" ON "Order"("ordreNr");
