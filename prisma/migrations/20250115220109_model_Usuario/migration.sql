-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "ID_Usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "Plano" TEXT NOT NULL,
    "Foto" TEXT
);
INSERT INTO "new_Usuario" ("Email", "Foto", "ID_Usuario", "Nome", "Plano", "Senha") SELECT "Email", "Foto", "ID_Usuario", "Nome", "Plano", "Senha" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
