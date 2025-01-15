import { Usuario } from "@prisma/client";
import prisma from "../../../config/prismaClient";

class UsuarioService {
    async create(body: Usuario){
        const Usuario = await prisma.Usuario.create({
            data: {
                Email: body.Email,
                Nome: body.Nome,
                Senha: body.Senha,
                Plano: body.Plano,
                Foto: body.Foto
            }
        });

        return Usuario;
    }
}

export default new UsuarioService();
