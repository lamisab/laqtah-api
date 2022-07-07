/*
  Warnings:

  - You are about to drop the column `name` on the `Portress` table. All the data in the column will be lost.
  - Added the required column `password` to the `Portress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Portress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portress" DROP COLUMN "name",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
