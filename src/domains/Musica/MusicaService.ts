import { Musica } from "@prisma/client";
import prisma from "../../../config/prismaClient";

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

    async findAll() {
        return await prisma.musica.findMany({
            include: {
                Artista: true,
                Album: true,
            },
        });
    }

    async findById(id: number) {
        return await prisma.musica.findUnique({
            where: { ID_Musica: id },
            include: {
                Artista: true,
                Album: true,
            },
        });
    }

    async update(id: number, body: Partial<Musica>) {
        const updatedMusica = await prisma.musica.update({
            where: { ID_Musica: id },
            data: body,
        });
        return updatedMusica;
    }

    async delete(id: number) {
        const deletedMusica = await prisma.musica.delete({
            where: { ID_Musica: id },
        });
        return deletedMusica;
    }
}

export default new MusicaService();