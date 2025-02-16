import UsuarioService from "././UsuarioService";
import { InvalidParamError } from "../../../../errors/InvalidParamError"; 
import { QueryError } from "../../../../errors/QueryError";
import { prismaMock } from "../../../../config/singleton";
import { mockReset } from "jest-mock-extended";

describe("UsuarioService", () => {
    beforeEach(() => {
        mockReset(prismaMock);
    });
    
    describe("create", () => {
        test("recebe dados válidos de usuário ==> cria um novo usuário", async () => {
            const usuario = { ID_Usuario: 1, Email: "teste@.com", Nome: "usuario", Senha: "encrypted", isAdmin: false, Foto: "jpg" };

            prismaMock.usuario.create.mockResolvedValue(usuario);

            await expect(UsuarioService.create(usuario)).resolves.toEqual(usuario);
        });

        test("tenta criar usúario sem email ==> lança InvalidParamError", async () => {
            const invalidUser = { ID_Usuario: 1, Email: null, Nome: "usuario", Senha: "encrypted", isAdmin: false, Foto: "jpg" };

            await expect(UsuarioService.create(invalidUser as any)).rejects.toThrow(InvalidParamError);
        });

        test("tenta criar usúario sem nome ==> lança InvalidParamError", async () => {
            const invalidUser = { ID_Usuario: 1, Email: "teste@.com", Nome: null, Senha: "encrypted", isAdmin: false, Foto: "jpg" };

            await expect(UsuarioService.create(invalidUser as any)).rejects.toThrow(InvalidParamError);
        });        
    });

});
