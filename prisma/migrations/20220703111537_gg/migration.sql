-- CreateEnum
CREATE TYPE "Which" AS ENUM ('client', 'admin');

-- CreateEnum
CREATE TYPE "Methods" AS ENUM ('cash', 'card');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'accepted', 'rejected');

-- CreateTable
CREATE TABLE "User" (
    "user_id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Which" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Portress" (
    "portress_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "Portress_pkey" PRIMARY KEY ("portress_id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "feedback_id" UUID NOT NULL,
    "feedback" TEXT NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "res_id" UUID NOT NULL,
    "total" INTEGER NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "res_date" TIMESTAMP(3) NOT NULL,
    "res_status" "Status",
    "user_id" UUID,
    "portressPortress_id" UUID,
    "payment_id" UUID,
    "paymentPayment_id" UUID,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("res_id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "payment_id" UUID NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_methods" "Methods" NOT NULL,
    "portress_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "res_id" UUID NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "ChatSupport" (
    "chat_id" UUID NOT NULL,
    "QA" TEXT NOT NULL,
    "portress_id" UUID,
    "user_id" UUID,

    CONSTRAINT "ChatSupport_pkey" PRIMARY KEY ("chat_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Portress_email_key" ON "Portress"("email");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_portressPortress_id_fkey" FOREIGN KEY ("portressPortress_id") REFERENCES "Portress"("portress_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_portress_id_fkey" FOREIGN KEY ("portress_id") REFERENCES "Portress"("portress_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_res_id_fkey" FOREIGN KEY ("res_id") REFERENCES "Reservation"("res_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatSupport" ADD CONSTRAINT "ChatSupport_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatSupport" ADD CONSTRAINT "ChatSupport_portress_id_fkey" FOREIGN KEY ("portress_id") REFERENCES "Portress"("portress_id") ON DELETE SET NULL ON UPDATE CASCADE;
