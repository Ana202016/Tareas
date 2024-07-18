-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "active" BOOLEAN DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
