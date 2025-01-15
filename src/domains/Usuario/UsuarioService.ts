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

	async getUsuario() {
		const Usuario = await prisma.Usuario.findMany( { orderBy: { Nome: 'asc' }}); 
		
		return Usuario;
	}

	async getUsuariobyEmail(wantedEmail: string) {
		const user = await prisma.Usuario.findFirst({ where: { Email: wantedEmail } });
		return user;
	}

	async getUserbyId(wantedId: string) {
		const user = await prisma.Usuario.findFirst({ where: { id: wantedId } });
		return user;
	}
    }
}

export default new UsuarioService();