import { Usuario } from "@prisma/client";
import prisma from "../../../../config/prismaClient";

class UsuarioService {
    async create(body: Usuario){
        const Usuario = await prisma.usuario.create({
            data: {
                Email: body.Email,
                Nome: body.Nome,
                Senha: body.Senha,
                isAdmin: body.isAdmin,
                Foto: body.Foto
            }
        });
    
        return Usuario;
    }

    async findAll() {
        return await prisma.usuario.findMany();
    }
    
    async findById(id: number) {
        return await prisma.usuario.findUnique({
            where: { ID_Usuario: id },
        });
    }

    async update(id: number, body: Partial<Usuario>) {
        const updatedUser = await prisma.usuario.update({
            where: { ID_Usuario: id },
            data: body,
        });
        return updatedUser;
    }

    async delete(id: number) {
        const deletedUser = await prisma.usuario.delete({
            where: { ID_Usuario: id },
        });
        return deletedUser;
    }

}

export default new UsuarioService();
