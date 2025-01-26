import { Artista } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class ArtistaService {
    async create(body: Artista) {
        const Artista = await prisma.artista.create({
            data: {
                Nome: body.Nome,
                Foto: body.Foto,
                Num_Streams: body.Num_Streams
            }
        });

        return Artista;
    }

    async findAll() {
        return await prisma.artista.findMany();
    }

    async findById(id: number) {
        return await prisma.artista.findUnique({
            where: { ID_Artista: id },
        });
    }

    async update(id: number, body: Partial<Artista>) {
        const updatedArtist = await prisma.artista.update({
            where: { ID_Artista: id },
            data: body,
        });
        return updatedArtist;
    }

    async delete(id: number) {
        const deletedArtist = await prisma.artista.delete({
            where: { ID_Artista: id },
        });
        return deletedArtist;
    }

}

export default new ArtistaService();