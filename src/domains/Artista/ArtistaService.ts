import { Artista } from "@prisma/client";
import prisma from "../../../config/prismaClient";

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

}

export default new ArtistaService();