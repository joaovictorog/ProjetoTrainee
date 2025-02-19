import { Musica } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import { QueryError } from "../../../../errors/QueryError";
import { InvalidRouteError } from "../../../../errors/InvalidRouteError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import ArtistaService from "../../Artista/services/ArtistaService";

class MusicaService {
    async create(body: Musica){
        if(body.Nome == null){
            throw new InvalidParamError("A música deve ter nome!");
        }

        if(body.Genero == null){
            throw new InvalidParamError("A música deve ter um gênero!");
        }

        if(body.ArtistaID == null){
            throw new InvalidParamError("A música deve pertencer a um artista!");
        }

        const existingArtista = await ArtistaService.findById(body.ArtistaID);
        if(!existingArtista){
            throw new InvalidParamError("O arista com id ${body.ArtistaID} não existe!");
        }

        const musica = await prisma.musica.create({
            data: {
                Nome: body.Nome,
                ArtistaID: body.ArtistaID,
                Genero: body.Genero,
                AlbumID: body.AlbumID,
                Num_Streams: body.Num_Streams,
                Data_Lancamento: body.Data_Lancamento
            },
        });

        return musica;
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
            const musica = await prisma.musica.findMany();
            if(musica.length === 0){
                throw new QueryError("Nenhuma musica encontrada.");
            }
            return musica;
    }

    async findById(id: number) {
        if (id == null) {
            throw new InvalidParamError("Request não possui um ID");
        }
        const musica = await prisma.musica.findUnique({
            where: {ID_Musica:id}
        });
        if (!musica) {
            throw new QueryError("Não existe música com esse id");
        }
        return musica;
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
        return {message: "Música deletada com sucesso!"};
    }
}

export default new MusicaService();