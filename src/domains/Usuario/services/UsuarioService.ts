import { Musica, Usuario } from "@prisma/client";
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
        if(body.Email == null || body.Email == undefined){
			throw new InvalidParamError("Informe um email.");
		}

        if(body.Nome == null || body.Nome == undefined){
			throw new InvalidParamError("Informe um nome.");
		}

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
        const usuario = await prisma.usuario.findMany();
        if(!usuario || usuario.length === 0){
			throw new QueryError("Nenhum usuário encontrado.");
		}

        return usuario;
    }

    async checkEmail(email: string) {
        const usuario = await prisma.usuario.findUnique({
            where: { Email: email },
        });

        return usuario;
    }

    async findByEmail(email: string) {
        if(!email) {
            throw new InvalidParamError("Informe um email.");
        }

        const usuario = await prisma.usuario.findUnique({
            where: { Email: email },
        });

        if(!usuario) {
            throw new QueryError(`Usuário com email ${email} não encontrado.`);
        }
    
        return usuario;
    }

    async findById(id: number) {
        if(!id) {
            throw new InvalidParamError("Informe um ID de usuário.");
        }

        const usuario = await prisma.usuario.findUnique({
            where: { ID_Usuario: id },
        });
    
        if (!usuario) {
            throw new QueryError(`Usuário com ID ${id} não encontrado.`);
        }
    
        return usuario;    
    }

    async getUserMusicas(id:number) {
        const userWithMusicas = await prisma.usuario.findUnique({
            where:{ID_Usuario: id}, select:{
                Nome:true,
                Email:true,
                Senha:true,
                Foto:true,
                Musicas:true
            }
        });
        if (!userWithMusicas) {
            throw new QueryError(`Usuário com ID ${id} não encontrado.`);
        }

        return userWithMusicas;
    }

    async updateMusicas(id_user: number, body: Partial<Usuario>, id_musica: number, currentUser: Usuario) {
        const existingUser = await prisma.usuario.findUnique({
            where: { ID_Usuario: id_user },
        });

        const existingMusic = await prisma.musica.findUnique({
            where: { ID_Musica: id_musica },
        });
    
        if (!existingUser) {
            throw new QueryError(`Usuário com ID ${id_user} não encontrado.`);
        }

        if (!existingMusic) {
            throw new QueryError(`Música com ID ${id_musica} não encontrada.`);
        }
    
        if (!currentUser.isAdmin && currentUser.ID_Usuario !== id_user) {
            throw new InvalidParamError("Você só pode editar sua própria conta.");
        }
    
        if (!currentUser.isAdmin && body.hasOwnProperty("isAdmin")) {
            throw new InvalidParamError("Você não tem permissão para alterar o campo isAdmin.");
        }
    
        if (body.Senha) {
            body.Senha = await this.encryptPassword(body.Senha);
        }
    
        const updatedUser = await prisma.usuario.update({
            where: { ID_Usuario: id_user },
            data: {
                Musicas: {
                 connect: {
                  ID_Musica: id_musica,
                 },
                },
               }, select:{
                ID_Usuario:true, Email:true, Nome:true, Musicas:true
               }
        });
    
        return updatedUser;
    }

    async deleteMusicas(id_user: number, id_musica:number) {
        const existingUser = await prisma.usuario.findUnique({
            where: { ID_Usuario: id_user },
        });

        const existingMusic = await prisma.musica.findUnique({
            where: { ID_Musica: id_musica },
        });

        if (!existingUser) {
            throw new QueryError(`Usuário com ID ${id_user} não encontrado.`);
        }

        if (!existingMusic) {
            throw new QueryError(`Música com ID ${id_musica} não encontrada.`);
        }
        
        const updatedUser = await prisma.usuario.update({
            where: { ID_Usuario: id_user },
            data: {
                Musicas: {
                 disconnect: {
                  ID_Musica: id_musica,
                 },
                },
               }, select:{
                ID_Usuario:true, Email:true, Nome:true, Musicas:true
               }
        });

        return updatedUser;
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
}


export default new UsuarioService();
