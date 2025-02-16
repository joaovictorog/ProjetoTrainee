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

    describe("findAll", () => {
        test("usuários existentes ==> retorna todos os usuários", async () => {
            const usuario = [{ ID_Usuario: 1, Email: "teste@.com", Nome: "usuario", Senha: "encrypted", isAdmin: false, Foto: "jpg" }];

            prismaMock.usuario.findMany.mockResolvedValue(usuario);

            await expect(UsuarioService.findAll()).resolves.toEqual(usuario);
        });

        test("usuários inexistentes ==> lança QueryError", async () => {
            prismaMock.usuario.findMany.mockResolvedValue([]);

            await expect(UsuarioService.findAll()).rejects.toThrow(QueryError);
        });
    });

    describe("findByEmail", () => {
        test("email válido fornecido ==> retorna usuário correspondente", async () => {
            const usuario = { ID_Usuario: 1, Email: "teste@.com", Nome: "usuario", Senha: "encrypted", isAdmin: false, Foto: "jpg" };

            prismaMock.usuario.findUnique.mockResolvedValue(usuario);

            await expect(UsuarioService.findByEmail("teste@.com")).resolves.toEqual(usuario);
        });

        test("usuário não encontrado por email ==> lança QueryError", async () => {
            prismaMock.usuario.findUnique.mockResolvedValue(null);

            await expect(UsuarioService.findByEmail("teste@.com")).rejects.toThrow(QueryError);
        });

        test("email não fornecido ==> lança InvalidParamError", async () => {
            await expect(UsuarioService.findByEmail(null as any)).rejects.toThrow(InvalidParamError);
        });

    });

    describe("findById", () => {
        test("ID válido fornecido ==> retorna usuário correspondente", async () => {
            const usuario = { ID_Usuario: 1, Email: "teste@.com", Nome: "usuario", Senha: "encrypted", isAdmin: false, Foto: "jpg" };

            prismaMock.usuario.findUnique.mockResolvedValue(usuario);

            await expect(UsuarioService.findById(1)).resolves.toEqual(usuario);
        });

        test("usuário não encontrado por ID ==> lança QueryError", async () => {
            prismaMock.usuario.findUnique.mockResolvedValue(null);

            await expect(UsuarioService.findById(1)).rejects.toThrow(QueryError);
        });

        test("ID não fornecido ==> lança InvalidParamError", async () => {
            await expect(UsuarioService.findById(null as any)).rejects.toThrow(InvalidParamError);
        });
    });

});
