/*
  Warnings:

  - You are about to drop the column `Plano` on the `Usuario` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "ID_Usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "Foto" TEXT
);
INSERT INTO "new_Usuario" ("Email", "Foto", "ID_Usuario", "Nome", "Senha") SELECT "Email", "Foto", "ID_Usuario", "Nome", "Senha" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
