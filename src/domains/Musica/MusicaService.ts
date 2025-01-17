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

    async update(id: number, data: Partial<Musica>) {
        return await prisma.musica.update({
            where: { ID_Musica: id },
            data,
        });
    }

    async delete(id: number) {
        return await prisma.musica.delete({
            where: { ID_Musica: id },
        });
    }
}

export default new MusicaService();