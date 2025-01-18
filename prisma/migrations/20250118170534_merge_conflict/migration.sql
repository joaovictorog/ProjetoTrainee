/*
  Warnings:

  - Added the required column `Nome` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Album" (
    "ID_Album" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nome" TEXT NOT NULL,
    "ArtistaID" INTEGER NOT NULL,
    "Data_Lancamento" DATETIME NOT NULL,
    "Capa" TEXT,
    "Num_Musicas" INTEGER NOT NULL,
    CONSTRAINT "Album_ArtistaID_fkey" FOREIGN KEY ("ArtistaID") REFERENCES "Artista" ("ID_Artista") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Album" ("ArtistaID", "Data_Lancamento", "ID_Album", "Num_Musicas") SELECT "ArtistaID", "Data_Lancamento", "ID_Album", "Num_Musicas" FROM "Album";
DROP TABLE "Album";
ALTER TABLE "new_Album" RENAME TO "Album";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
