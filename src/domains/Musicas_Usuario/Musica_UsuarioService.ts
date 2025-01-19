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
}