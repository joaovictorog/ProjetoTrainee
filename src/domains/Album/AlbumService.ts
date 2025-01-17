import { Album } from "@prisma/client";
import prisma from "../../../config/prismaClient";

class AlbumService {
    async create(body: Album){
        const album = await prisma.album.create({
            data: {
                Nome: body.Nome,
                ArtistaID: body.ArtistaID,
                Data_Lancamento: body.Data_Lancamento,
                Capa: body.Capa,
                Num_Musicas: body.Num_Musicas
            }
        });
    
        return album;
    }

    async findAll() {
        return await prisma.album.findMany({
            select: {
                ID_Album: false,
                Nome: true,
                Capa: true,
                Artista: true,
                Num_Musicas: true,
                Data_Lancamento: true
            }
        });
    }
    
    async findById(id: number) {
        return await prisma.album.findUnique({
            where: { ID_Album: id },
            select: {
                ID_Album: false,
                Nome: true,
                Capa: true,
                Artista: true,
                Num_Musicas: true,
                Data_Lancamento: true
            }
        });
    }

    async update(id: number, body: Partial<Album>) {
        const updatedAlbum = await prisma.album.update({
            where: { ID_Album: id },
            data: body,
        });
        return updatedAlbum;
    }

    async delete(id: number) {
        const deletedAlbum = await prisma.album.delete({
            where: { ID_Album: id },
        });
        return deletedAlbum;
    }

}

export default new AlbumService();