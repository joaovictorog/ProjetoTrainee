-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artista" (
    "ID_Artista" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nome" TEXT NOT NULL,
    "Foto" TEXT,
    "Num_Streams" INTEGER NOT NULL
);
INSERT INTO "new_Artista" ("Foto", "ID_Artista", "Nome", "Num_Streams") SELECT "Foto", "ID_Artista", "Nome", "Num_Streams" FROM "Artista";
DROP TABLE "Artista";
ALTER TABLE "new_Artista" RENAME TO "Artista";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
