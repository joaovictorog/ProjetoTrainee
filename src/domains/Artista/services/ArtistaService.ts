import { Artista } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import { QueryError } from "../../../../errors/QueryError";

class ArtistaService {
    async create(body: Artista) {
        const artista = await prisma.artista.create({
            data: {
                Nome: body.Nome.charAt(0).toUpperCase() + body.Nome.substring(1),
                Foto: body.Foto,
                Num_Streams: body.Num_Streams
            }
        });

        return artista;
    }

    async findAll() {
        return await prisma.artista.findMany({
            orderBy: {
                Nome: 'asc'
            }
        });
    }

    async findById(id: number) {
        const artista = await prisma.artista.findUnique({
            where: { ID_Artista: id },
        });

        if(!artista) {
            throw new QueryError(`Artista com ID ${id} não encontrado.`);
        }

        return artista;
    }

    async update(id: number, body: Partial<Artista>) {
        const existingArtist = await prisma.artista.findUnique({
            where: { ID_Artista: id },
        });

        if(!existingArtist) {
            throw new QueryError(`Artista com ID ${id} não encontrado.`);
        }

        const updatedArtist = await prisma.artista.update({
            where: { ID_Artista: id },
            data: body,
        });

        return updatedArtist;
    }

    async delete(id: number) {
        const existingArtist = await prisma.artista.findUnique({
            where: { ID_Artista: id },
        });

        if(!existingArtist) {
            throw new QueryError(`Artista com ID ${id} não encontrado.`);
        }

        await prisma.artista.delete({
            where: { ID_Artista: id },
        });

        return { message: "Artista deletado com sucesso!" };
    }

}

export default new ArtistaService();