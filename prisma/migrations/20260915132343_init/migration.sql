-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "dangerLevel" INTEGER NOT NULL DEFAULT 1,
    "race" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "ability" TEXT NOT NULL DEFAULT '',
    "weakness" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'Ativo',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
