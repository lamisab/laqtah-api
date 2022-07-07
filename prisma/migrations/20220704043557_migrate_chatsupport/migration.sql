-- DropForeignKey
ALTER TABLE "ChatSupport" DROP CONSTRAINT "ChatSupport_portress_id_fkey";

-- DropForeignKey
ALTER TABLE "ChatSupport" DROP CONSTRAINT "ChatSupport_user_id_fkey";

-- AlterTable
ALTER TABLE "ChatSupport" ALTER COLUMN "portress_id" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ChatSupport" ADD CONSTRAINT "ChatSupport_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatSupport" ADD CONSTRAINT "ChatSupport_portress_id_fkey" FOREIGN KEY ("portress_id") REFERENCES "Portress"("portress_id") ON DELETE SET NULL ON UPDATE CASCADE;
