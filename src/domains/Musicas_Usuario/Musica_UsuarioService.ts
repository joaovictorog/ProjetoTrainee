import { Musicas_Usuario } from "@prisma/client";
import prisma from "../../../config/prismaClient";

class MusicaUsuarioService {
    async create(body: Musicas_Usuario) {
        const musicaUsuario = await prisma.musicas_Usuario.create({
            data: {
                UsuarioID: body.UsuarioID,
                ID_Musica: body.ID_Musica,
                Data_Criacao: body.Data_Criacao,
            },
        });
        return musicaUsuario;
    }

    async findAll() {
        return await prisma.musicas_Usuario.findMany({
            include: {
                Usuario: true,
                Musica: true,
            },
        });
    }

    async findById(usuarioId: number, musicaId: number) {
        return await prisma.musicas_Usuario.findUnique({
            where: {
                UsuarioID_ID_Musica: { UsuarioID: usuarioId, ID_Musica: musicaId },
            },
            include: {
                Usuario: true,
                Musica: true,
            },
        });
    }

    async update(usuarioId: number, musicaId: number, body: Partial<Musicas_Usuario>) {
        const musicaUsuario = await prisma.musicas_Usuario.update({
            where: {
                UsuarioID_ID_Musica: { UsuarioID: usuarioId, ID_Musica: musicaId },
            },
            data: body,
        });
        return musicaUsuario;
    }

    async delete(usuarioId: number, musicaId: number) {
        const musicaUsuario = await prisma.musicas_Usuario.delete({
            where: {
                UsuarioID_ID_Musica: { UsuarioID: usuarioId, ID_Musica: musicaId },
            },
        });
        return musicaUsuario;
    }
}

export default new MusicaUsuarioService();