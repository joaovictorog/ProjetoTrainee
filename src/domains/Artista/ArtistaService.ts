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
}

export default new ArtistaService();