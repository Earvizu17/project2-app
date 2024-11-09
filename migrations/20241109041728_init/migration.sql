-- CreateTable
CREATE TABLE "Cards" (
    "Id" SERIAL NOT NULL,
    "Question" TEXT NOT NULL,
    "Answer" TEXT NOT NULL,
    "Understanding" INTEGER NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("Id")
);
