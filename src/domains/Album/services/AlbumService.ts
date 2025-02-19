import { Album } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import { QueryError } from "../../../../errors/QueryError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import ArtistaService from "../../Artista/services/ArtistaService";

class AlbumService {
    async create(body: Album){
        if(body.Nome == null){
            throw new InvalidParamError("O album deve ter um nome!");
        };

        if(body.ArtistaID == null){
            throw new InvalidParamError("O album deve pertencer a um artista!");
        };

        const existingArtista = await ArtistaService.findById(body.ArtistaID);
        if(!existingArtista){
            throw new InvalidParamError("O arista com id ${body.ArtistaID} não existe!");
        };
        
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
        const albuns = await prisma.album.findMany();
        if(!albuns){
            throw new QueryError("Ainda não existem albuns cadastrados no sistema!")
        };
        return albuns;
    }
    
    async findById(id: number) {
        const album = await prisma.album.findUnique({
            where: {
                ID_Album : id,
            }
        })
        if(!album){
            throw new QueryError('Album com ID informado não encontrado');
        };

        return album;
    }

    async update(id: number, body: Partial<Album>) {
        const existingAlbum = await prisma.album.findUnique({
            where: { ID_Album: id}
        });

        if(!existingAlbum){
            throw new QueryError('Album com ID informado não encontrado');
        };
        
        const updatedAlbum = await prisma.album.update({
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
        };

        deletedAlbum = await prisma.album.delete({
            where: { ID_Album: id },
        });
        return {message: "Album deletado com sucesso"};
    }

}

export default new AlbumService();