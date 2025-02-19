import MusicaService from "././MusicaService";
import { InvalidParamError } from "../../../../errors/InvalidParamError"; 
import { QueryError } from "../../../../errors/QueryError";
import { prismaMock } from "../../../../config/singleton";
import { mockReset } from "jest-mock-extended";

import ArtistaService from "../../Artista/services/ArtistaService";

jest.mock("../../Artista/services/ArtistaService", () => ({
    __esModule: true,
    default: {
      findById: jest.fn(),
    },
  }));

describe("MusicaService", () => {
    beforeEach(() => {
        mockReset(prismaMock);
        jest.clearAllMocks();
    });

    describe("create", () => {
        test("recebe dados válidos de música ==> cria uma nova música", async () => {
            const musica = {
                ID_Musica: 1,
                Nome: "Música Teste",
                ArtistaID: 2,
                Genero: "Pop",
                AlbumID: 3,
                Num_Streams: 10000,
                Data_Lancamento: new Date("2023-01-01"),
            };

            (ArtistaService.findById as jest.Mock).mockResolvedValue({
                ID_Artista: 2,
                Nome: "Artista Qualquer"
              });
  
            prismaMock.musica.create.mockResolvedValue(musica);
  
            await expect(MusicaService.create(musica)).resolves.toEqual(musica);
        });
        test("tenta criar música sem nome ==> lança InvalidParamError", async () => {
            const musica = {
                ID_Musica: 1,
                Nome: null,
                ArtistaID: 2,
                Genero: "Pop",
                AlbumID: 3,
                Num_Streams: 10000,
                Data_Lancamento: new Date("2023-01-01"),
            };
            await expect(MusicaService.create(musica as any)).rejects.toThrow(InvalidParamError);
        });
        test("tenta criar música sem gênero ==> lança InvalidParamError", async () => {
            const invalidMusica = {
                ID_Musica: 1,
                Nome: "Música Teste",
                ArtistaID: 2,
                Genero: null,
                AlbumID: 3,
                Num_Streams: 10000,
                Data_Lancamento: new Date("2023-01-01"),
            };
            await expect(MusicaService.create(invalidMusica as any)).rejects.toThrow(InvalidParamError);
        });
        test("tenta criar uma musica sem pertencer a um artista ==> lança InvalidParamError", async () => {
            const invalidMusica = { 
                ID_Musica: 1,
                Nome: "Música Teste",
                ArtistaID: 999,
                Genero: "Pop",
                AlbumID: 3,
                Num_Streams: 10000,
                Data_Lancamento: new Date("2023-01-01"),
            };
            (ArtistaService.findById as jest.Mock).mockResolvedValue(null);

            await expect(MusicaService.create(invalidMusica as any)).rejects.toThrow(InvalidParamError);
        });
    });
    describe("findFromArtist", () => {
        test("artista válido fornecido => retorna musicas do artista", async () => {
            const musicasArtista = [
                {
                ID_Musica: 5,
                Nome: "Música Teste",
                ArtistaID: 6,
                Genero: "Pop",
                AlbumID: 7,
                Num_Streams: 10000,
                Data_Lancamento: new Date("2023-01-01"),
                Artista: {
                    ArtistaID: 6,
                    Nome: "Cleiton Rasta",
                    Foto: "foto.jpg",
                    Num_Streams: 20000,
                },
                Album: {
                    ID_Album: 7,
                    Nome: "Album",
                    ArtistaID: 6,
                    Data_Lancamento: new Date("2020-01-01"),
                    Capa: "capa.jpg",
                    Num_Musicas: 1
                },
            }
        ];

            prismaMock.musica.findMany.mockResolvedValue(musicasArtista);

            await expect(MusicaService.findFromArtist(6)).resolves.toEqual(musicasArtista);
        });
        test("artista inválido ==> lança QueryError", async () => {
            prismaMock.musica.findMany.mockResolvedValue(null as any);

            await expect(MusicaService.findFromArtist(123)).rejects.toThrow(QueryError);
        });
    });
    
    describe("findAll", () => {
        test("música existente ==> retorna todas as músicas", async () => {
            const musica = [
            {
                ID_Musica: 10,
                Nome: "Musica Teste2",
                ArtistaID: 2,
                Genero: "Punk",
                AlbumID: 5,
                Num_Streams: 1000,
                Data_Lancamento: new Date("2005-02-12"),
                Artista: { /* ... */ },
                Album: { /* ... */ },
            },
        ];
        prismaMock.musica.findMany.mockResolvedValue(musica);

        await expect(MusicaService.findAll()).resolves.toEqual(musica);
        });
        test("música inexistente ==> lança QuerryError", async () => {
            prismaMock.musica.findMany.mockResolvedValue([]);
            await expect(MusicaService.findAll()).rejects.toThrow(QueryError);
        })
    });

    describe("findById", () => {
        test("música existe ==> retorna a música", async ()=>{
            const existingMusica = { 
                ID_Musica: 99,
                Nome: "Musicaz 3",
                ArtistaID: 2,
                Genero: "Pop",
                AlbumID: 1,
                Num_Streams: 500,
                Data_Lancamento: new Date("2022-05-05")
            };
            prismaMock.musica.findUnique.mockResolvedValue(existingMusica);

            await expect(MusicaService.findById(existingMusica.ID_Musica)).resolves.toEqual(existingMusica);
        });
        test("ID não fornecido ==> lança InvalidParamError", async () => {
            await expect(MusicaService.findById(null as any)).rejects.toThrow(InvalidParamError);
       });
        test("música inexistente ==> lança QueryError", async () => {
            prismaMock.musica.findUnique.mockResolvedValue(null);
            await expect(MusicaService.findById(999)).rejects.toThrow(QueryError);
        });
    });

    describe("update", () => {
        test("dados válidos ==> retorna música atualizada", async () => {
            const existingMusica = { 
                ID_Musica: 1,
                Nome: "Musica",
                ArtistaID: 3,
                Genero: "Pop",
                AlbumID: 4,
                Num_Streams: 500,
                Data_Lancamento: new Date("2022-05-05")
            };

            const updatedMusica = {
                ID_Musica: 1,
                Nome: "Musica Nova",
                ArtistaID: 3,
                Genero: "Pop",
                AlbumID: 4,
                Num_Streams: 500,
                Data_Lancamento: new Date("2022-05-05")
            };

            prismaMock.musica.findUnique.mockResolvedValue(existingMusica);
            prismaMock.musica.update.mockResolvedValue(updatedMusica);

            await expect(MusicaService.update(1, {Nome: "Musica Nova"})).resolves.toEqual(updatedMusica);
        });
        test("música com o ID informado inexistente ==> lança QuerryError", async () => {
            prismaMock.musica.findUnique.mockResolvedValue(null);
            await expect(MusicaService.update(1, null as any)).rejects.toThrow(QueryError);
        });
    });

    describe("delete", () => {
        test("dados válidos ==> música deletada", async () => {
            const existingMusica = {
                ID_Musica: 9,
                Nome: "Musica",
                ArtistaID: 3,
                Genero: "Pop",
                AlbumID: 4,
                Num_Streams: 500,
                Data_Lancamento: new Date("2022-05-05")
            };
            const deletedMusica = {message: "Música deletada com sucesso!"};

            prismaMock.musica.findUnique.mockResolvedValue(existingMusica);
            prismaMock.musica.delete.mockResolvedValue(existingMusica);

            await expect(MusicaService.delete(9)).resolves.toEqual(deletedMusica);
        });
        test("música não encontrada ==> lança QuerryError", async () => {
            const existingMusica = {
                ID_Musica: 9,
                Nome: "Musica 1",
                ArtistaID: 3,
                Genero: "Pop",
                AlbumID: 4,
                Num_Streams: 500,
                Data_Lancamento: new Date("2022-05-05")
            };

            prismaMock.musica.findUnique.mockResolvedValue(null);
            await expect(MusicaService.delete(9)).rejects.toThrow(QueryError);
        });
    });
});