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

    describe("getUserMusicas", () => {
        test("recebe as músicas ouvidas pelo usuário ==> lista as músicas", async () => {
            const usuario = {
                ID_Usuario: 1,
                Email: "teste@.com",
                Nome: "usuario",
                Senha: "encrypted",
                isAdmin: false,
                Foto: "jpg",
                Musicas: [{
                    ID_Musica: 1, 
                    Nome: "New Sound", 
                    ArtistaID: 1, 
                    Genero: "POP", 
                    AlbumID: 1, 
                    Num_Streams: 10, 
                    Data_Lancamento: new Date('2024-10-20 12:30:00')
                }]
            };

            prismaMock.usuario.findUnique.mockResolvedValue(usuario);

            await expect(UsuarioService.getUserMusicas(1)).resolves.toEqual(usuario);
        });

        test("usuário não encontrado ==> lança QueryError", async () => {
            prismaMock.usuario.findUnique.mockResolvedValue(null);

            await expect(UsuarioService.getUserMusicas(1)).rejects.toThrow(QueryError);
        });
    });

    describe("updateMusicas", () => {
        test("tenta atualizar as músicas ouvidas pelo usuário ==> atualiza as músicas", async () => {
            const usuario = { ID_Usuario: 1, Email: "teste@.com", Nome: "usuario", Senha: "encrypted", isAdmin: true, Foto: "jpg",
                Musicas: [] };
            const musica = { ID_Musica: 1, Nome: "NewSong", ArtistaID: 1, Genero: "POP", AlbumID: 1, Num_Streams: 10, 
                Data_Lancamento: new Date('2024-10-20 12:30:00') };

            prismaMock.usuario.findUnique.mockResolvedValue(usuario);
            prismaMock.musica.findUnique.mockResolvedValue(musica);
            prismaMock.usuario.update.mockResolvedValue(usuario);

            await expect(UsuarioService.updateMusicas(1, usuario, 1, usuario)).resolves.toEqual(usuario);
        });

        test("tenta atualizar as músicas ouvidas pelo usuário sem ser admin ==> atualiza as músicas", async () => {
            const usuario = { ID_Usuario: 1, Email: "teste@.com", Nome: "usuario", Senha: "encrypted", isAdmin: false, Foto: "jpg",
                Musicas: [] };
            const musica = { ID_Musica: 1, Nome: "NewSong", ArtistaID: 1, Genero: "POP", AlbumID: 1, Num_Streams: 10, 
                Data_Lancamento: new Date('2024-10-20 12:30:00') };

            prismaMock.usuario.findUnique.mockResolvedValue(usuario);
            prismaMock.musica.findUnique.mockResolvedValue(musica);
            prismaMock.usuario.update.mockResolvedValue(usuario);

            await expect(UsuarioService.updateMusicas(1, usuario, 1, usuario)).rejects.toThrow(InvalidParamError);
        });

        test("música não encontrada ==> lança QueryError", async () => {
            const usuario = { ID_Usuario: 1, Email: "teste@.com", Nome: "usuario", Senha: "encrypted", isAdmin: false, Foto: "jpg" };

            prismaMock.usuario.findUnique.mockResolvedValue(usuario);
            prismaMock.musica.findUnique.mockResolvedValue(null);

            await expect(UsuarioService.updateMusicas(1, usuario, 1, usuario)).rejects.toThrow(QueryError);
        });

        test("usuário não encontrado ==> lança QueryError", async () => {
            const usuario = { ID_Usuario: 1, Email: "teste@.com", Nome: "usuario", Senha: "encrypted", isAdmin: false, Foto: "jpg" };

            prismaMock.usuario.findUnique.mockResolvedValue(null);

            await expect(UsuarioService.updateMusicas(1, usuario, 1, usuario)).rejects.toThrow(QueryError);
        });

        test("tenta atualizar as músicas de outro usuario sem ser admin ==> lança InvalidParamError", async () => {
            const usuario = { ID_Usuario: 1, Email: "teste@.com", Nome: "usuario", Senha: "encrypted", isAdmin: false, Foto: "jpg" };

            await expect(UsuarioService.updateMusicas(1, usuario, 1, usuario)).rejects.toThrow(QueryError);
        });
    });

    describe("deleteMusicas", () => {
        test("tenta remover música ouvida pelo usuário ==> remove música", async () => {
            const usuario = { ID_Usuario: 1, Email: "teste@.com", Nome: "usuario", Senha: "encrypted", isAdmin: false, Foto: "jpg" };
            const musica = { ID_Musica: 1, Nome: "NewSong", ArtistaID: 1, Genero: "POP", AlbumID: 1, Num_Streams: 10, 
                Data_Lancamento: new Date('2024-10-20 12:30:00') };

            prismaMock.usuario.findUnique.mockResolvedValue(usuario);
            prismaMock.musica.findUnique.mockResolvedValue(musica);
            prismaMock.usuario.update.mockResolvedValue(usuario);

            await expect(UsuarioService.deleteMusicas(1, 1)).resolves.toEqual(usuario);
        });

        test("música não encontrada no usuário ==> lança QueryError", async () => {
            const usuario = { ID_Usuario: 1, Email: "teste@.com", Nome: "usuario", Senha: "encrypted", isAdmin: false, Foto: "jpg" };

            prismaMock.usuario.findUnique.mockResolvedValue(usuario);

            await expect(UsuarioService.deleteMusicas(1, 1)).rejects.toThrow(QueryError);
        });

        test("usuário não encontrado ==> lança QueryError", async () => {
            prismaMock.usuario.findUnique.mockResolvedValue(null);

            await expect(UsuarioService.updateMusicas(1, null as any, 1, null as any)).rejects.toThrow(QueryError);
        });
    });

});
