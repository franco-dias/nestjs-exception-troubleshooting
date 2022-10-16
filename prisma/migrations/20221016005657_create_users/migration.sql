-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Customer" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userUUID" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userUUID" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "uuid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userUUID" TEXT NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userUUID_key" ON "Customer"("userUUID");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userUUID_key" ON "Teacher"("userUUID");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userUUID_fkey" FOREIGN KEY ("userUUID") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
