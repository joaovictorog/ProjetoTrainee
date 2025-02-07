import { Usuario } from "@prisma/client";
import prisma from "../../../../config/prismaClient";
import bcrypt from "bcrypt";
import { QueryError } from "../../../../errors/QueryError";
import { InvalidParamError } from "../../../../errors/InvalidParamError";

class UsuarioService {
    async encryptPassword(password: string) {
        const saltRounds = 10;
        const encrypted = await bcrypt.hash(password, saltRounds);
        return encrypted;
    }

    async create(body: Usuario) {
        const encrypted = await this.encryptPassword(body.Senha);
        const usuario = await prisma.usuario.create({
            data: {
                Email: body.Email,
                Nome: body.Nome,
                Senha: encrypted,
                isAdmin: body.isAdmin,
                Foto: body.Foto
            }
        });
    
        return usuario;
    }

    async findAll() {
        return await prisma.usuario.findMany();
    }

    async findByEmail(email: string) {
        const usuario = await prisma.usuario.findUnique({
            where: { Email: email },
        });
    
        return usuario;
    }

    async findById(id: number) {
        const usuario = await prisma.usuario.findUnique({
            where: { ID_Usuario: id },
        });
    
        if (!usuario) {
            throw new QueryError(`Usuário com ID ${id} não encontrado.`);
        }
    
        return usuario;    
    }

    async update(id: number, body: Partial<Usuario>, currentUser: Usuario) {
        const existingUser = await prisma.usuario.findUnique({
            where: { ID_Usuario: id },
        });
    
        if (!existingUser) {
            throw new QueryError(`Usuário com ID ${id} não encontrado.`);
        }
    
        if (!currentUser.isAdmin && currentUser.ID_Usuario !== id) {
            throw new InvalidParamError("Você só pode editar sua própria conta.");
        }
    
        if (!currentUser.isAdmin && body.hasOwnProperty("isAdmin")) {
            throw new InvalidParamError("Você não tem permissão para alterar o campo isAdmin.");
        }
    
        if (body.Senha) {
            body.Senha = await this.encryptPassword(body.Senha);
        }
    
        const updatedUser = await prisma.usuario.update({
            where: { ID_Usuario: id },
            data: body,
        });
    
        return updatedUser;
    }    

    async delete(id: number, currentUser: Usuario) {
        const existingUser = await prisma.usuario.findUnique({
            where: { ID_Usuario: id },
        });

        if (!existingUser) {
            throw new QueryError(`Usuário com ID ${id} não encontrado.`);
        }

        if (!currentUser.isAdmin && currentUser.ID_Usuario !== id) {
            throw new InvalidParamError("Você só pode excluir sua própria conta.");
        }

        await prisma.usuario.delete({
            where: { ID_Usuario: id },
        });

        return { message: "Usuário deletado com sucesso!" };
    }

    async listen(id_user:number, id_musica:number) {
        const link = await prisma.usuario.update({
            data: {
             Musicas: {
              connect: {
               ID_Musica: id_musica,
              },
             },
            },
            where: {
             ID_Usuario: id_user
            }
           });
           return link;
    }

    async unListen(id_user:number, id_musica:number) {
        const unlink = await prisma.usuario.update({
            data: {
             Musicas: {
              disconnect: {
               ID_Musica: id_musica,
              },
             },
            },
            where: {
             ID_Usuario: id_user
            }
           });
           return unlink;
    }
}


export default new UsuarioService();
