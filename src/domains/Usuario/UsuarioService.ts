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

    async findAll() {
        return await prisma.Usuario.findMany();
    }
    
    async findById(id: number) {
        return await prisma.Usuario.findUnique({
            where: { ID_Usuario: id },
        });
    }

    async update(id: number, body: Partial<Usuario>) {
        const updatedUser = await prisma.Usuario.update({
            where: { ID_Usuario: id },
            data: body,
        });
        return updatedUser;
    }

    async delete(id: number) {
        const deletedUser = await prisma.Usuario.delete({
            where: { ID_Usuario: id },
        });
        return deletedUser;
    }

}

export default new UsuarioService();
