-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "dangerLevel" INTEGER NOT NULL DEFAULT 1,
    "race" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "ability" TEXT NOT NULL DEFAULT '',
    "weakness" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'Ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
