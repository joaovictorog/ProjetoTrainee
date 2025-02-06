import { Album } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import { QueryError } from "../../../../errors/QueryError";

class AlbumService {
    async create(body: Album){
        const Album = await prisma.album.create({
            data: {
                ID_Album: body.ID_Album,
                Nome: body.Nome,
                ArtistaID: body.ArtistaID,
                Data_Lancamento: body.Data_Lancamento,
                Capa: body.Capa,
                Num_Musicas: body.Num_Musicas
            }
        });
    
        return Album;
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
        const album = await prisma.album.findUnique({
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
        if(!album){
            throw new QueryError('Album com ID informado não encontrado');
        }

        return album;
    }

    async update(id: number, body: Partial<Album>) {
        let updatedAlbum = await prisma.album.findUnique({
            where: { ID_Album: id}
        })

        if(!updatedAlbum){
            throw new QueryError('Album com ID informado não encontrado');
        }
        
        updatedAlbum = await prisma.album.update({
            where: { ID_Album: id },
            data: body,
        });

        return updatedAlbum;
    }

    async delete(id: number) {
        let deletedAlbum = await prisma.album.findUnique({
            where: { ID_Album: id}
        })

        if(!deletedAlbum){
            throw new QueryError('Album com ID informado não encontrado');
        }

        deletedAlbum = await prisma.album.delete({
            where: { ID_Album: id },
        });
        return deletedAlbum;
    }

}

export default new AlbumService();