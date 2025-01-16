-- CreateTable
CREATE TABLE "Usuario" (
    "ID_Usuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Email" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "Plano" TEXT NOT NULL,
    "Foto" TEXT
);

-- CreateTable
CREATE TABLE "Musica" (
    "ID_Musica" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nome" TEXT NOT NULL,
    "ArtistaID" INTEGER NOT NULL,
    "Genero" TEXT NOT NULL,
    "AlbumID" INTEGER NOT NULL,
    "Num_Streams" INTEGER NOT NULL,
    "Data_Lancamento" DATETIME NOT NULL,
    CONSTRAINT "Musica_ArtistaID_fkey" FOREIGN KEY ("ArtistaID") REFERENCES "Artista" ("ID_Artista") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Musica_AlbumID_fkey" FOREIGN KEY ("AlbumID") REFERENCES "Album" ("ID_Album") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Musicas_Usuario" (
    "UsuarioID" INTEGER NOT NULL,
    "ID_Musica" INTEGER NOT NULL,
    "Data_Criacao" DATETIME NOT NULL,

    PRIMARY KEY ("UsuarioID", "ID_Musica"),
    CONSTRAINT "Musicas_Usuario_UsuarioID_fkey" FOREIGN KEY ("UsuarioID") REFERENCES "Usuario" ("ID_Usuario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Musicas_Usuario_ID_Musica_fkey" FOREIGN KEY ("ID_Musica") REFERENCES "Musica" ("ID_Musica") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Artista" (
    "ID_Artista" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Nome" TEXT NOT NULL,
    "Foto" TEXT NOT NULL,
    "Num_Streams" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Album" (
    "ID_Album" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ArtistaID" INTEGER NOT NULL,
    "Data_Lancamento" DATETIME NOT NULL,
    "Num_Musicas" INTEGER NOT NULL,
    CONSTRAINT "Album_ArtistaID_fkey" FOREIGN KEY ("ArtistaID") REFERENCES "Artista" ("ID_Artista") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_Email_key" ON "Usuario"("Email");
