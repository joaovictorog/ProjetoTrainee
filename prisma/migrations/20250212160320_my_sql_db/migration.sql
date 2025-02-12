-- CreateTable
CREATE TABLE `Usuario` (
    `ID_Usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(191) NOT NULL,
    `Nome` VARCHAR(191) NOT NULL,
    `Senha` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `Foto` VARCHAR(191) NULL,

    UNIQUE INDEX `Usuario_Email_key`(`Email`),
    PRIMARY KEY (`ID_Usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Musica` (
    `ID_Musica` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(191) NOT NULL,
    `ArtistaID` INTEGER NOT NULL,
    `Genero` VARCHAR(191) NOT NULL,
    `AlbumID` INTEGER NOT NULL,
    `Num_Streams` INTEGER NOT NULL,
    `Data_Lancamento` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ID_Musica`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artista` (
    `ID_Artista` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(191) NOT NULL,
    `Foto` VARCHAR(191) NULL,
    `Num_Streams` BIGINT NOT NULL,

    PRIMARY KEY (`ID_Artista`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Album` (
    `ID_Album` INTEGER NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(191) NOT NULL,
    `ArtistaID` INTEGER NOT NULL,
    `Data_Lancamento` DATETIME(3) NOT NULL,
    `Capa` VARCHAR(191) NULL,
    `Num_Musicas` INTEGER NOT NULL,

    PRIMARY KEY (`ID_Album`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MusicaToUsuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MusicaToUsuario_AB_unique`(`A`, `B`),
    INDEX `_MusicaToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Musica` ADD CONSTRAINT `Musica_ArtistaID_fkey` FOREIGN KEY (`ArtistaID`) REFERENCES `Artista`(`ID_Artista`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Musica` ADD CONSTRAINT `Musica_AlbumID_fkey` FOREIGN KEY (`AlbumID`) REFERENCES `Album`(`ID_Album`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_ArtistaID_fkey` FOREIGN KEY (`ArtistaID`) REFERENCES `Artista`(`ID_Artista`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MusicaToUsuario` ADD CONSTRAINT `_MusicaToUsuario_A_fkey` FOREIGN KEY (`A`) REFERENCES `Musica`(`ID_Musica`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MusicaToUsuario` ADD CONSTRAINT `_MusicaToUsuario_B_fkey` FOREIGN KEY (`B`) REFERENCES `Usuario`(`ID_Usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
