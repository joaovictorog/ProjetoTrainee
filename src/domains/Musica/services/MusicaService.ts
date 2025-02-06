import { Musica } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import ArtistaService from "../../Artista/services/ArtistaService";
import { QueryError } from "../../../../errors/QueryError";

class MusicaService {
    async create(body: Musica){
        const Musica = await prisma.musica.create({
            data: {
                Nome: body.Nome,
                ArtistaID: body.ArtistaID,
                Genero: body.Genero,
                AlbumID: body.AlbumID,
                Num_Streams: body.Num_Streams,
                Data_Lancamento: body.Data_Lancamento
            },
        });

        return Musica;
    }

    async findFromArtist(id: number){
        const musicasArtista = await prisma.musica.findMany({
            where: { ArtistaID: id},
            include: {
                Artista: true,
                Album: true,
            }
        })
        if(!musicasArtista){
            throw new QueryError('Esse artista não existe/não tem musicas')
        }
        return musicasArtista
    }

    async findAll() {
        return await prisma.musica.findMany({
            include: {
                Artista: true,
                Album: true,
            },
        });
    }

    async findById(id: number) {
        const existingMusica = await prisma.musica.findUnique({
            where: {ID_Musica:id}
        })
        if(!existingMusica){
            throw new QueryError('Não existe musica com esse id')
        }
        const musica = await prisma.musica.findUnique({
            where: { ID_Musica: id },
            include: {
                Artista: true,
                Album: true,
            },
        });
        return musica
    }

    async update(id: number, body: Partial<Musica>) {
        const existingMusica = await prisma.musica.findUnique({
            where: {ID_Musica:id}
        })
        if(!existingMusica){
            throw new QueryError('Não existe musica com esse id')
        }
        const updatedMusica = await prisma.musica.update({
            where: { ID_Musica: id },
            data: body,
        });
        return updatedMusica;
    }

    async delete(id: number) {
        const existingMusica = await prisma.musica.findUnique({
            where: {ID_Musica:id}
        })
        if(!existingMusica){
            throw new QueryError('Não existe musica com esse id')
        }
        const deletedMusica = await prisma.musica.delete({
            where: { ID_Musica: id },
        });
        return deletedMusica;
    }
}

export default new MusicaService();