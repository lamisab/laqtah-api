-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_portress_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_res_id_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_user_id_fkey";

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "portress_id" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "res_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_portress_id_fkey" FOREIGN KEY ("portress_id") REFERENCES "Portress"("portress_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_res_id_fkey" FOREIGN KEY ("res_id") REFERENCES "Reservation"("res_id") ON DELETE SET NULL ON UPDATE CASCADE;
