/*
  Warnings:

  - You are about to drop the `Musicas_Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Musicas_Usuario";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_MusicaToUsuario" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MusicaToUsuario_A_fkey" FOREIGN KEY ("A") REFERENCES "Musica" ("ID_Musica") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MusicaToUsuario_B_fkey" FOREIGN KEY ("B") REFERENCES "Usuario" ("ID_Usuario") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MusicaToUsuario_AB_unique" ON "_MusicaToUsuario"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicaToUsuario_B_index" ON "_MusicaToUsuario"("B");
