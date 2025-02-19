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
            await expect(MusicaService.create(musica as any)).resolves.toThrow(InvalidParamError);
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
            await expect(MusicaService.create(invalidMusica as any)).resolves.toThrow(InvalidParamError);
        });

        test("tenta criar uma musica sem pertencer a um artista ==> lança InvalidParamError", async () => {
            const invalidMusica = { 
                ID_Musica: 1,
                Nome: "Música Teste",
                ArtistaID: 1,
                Genero: "Pop",
                AlbumID: 3,
                Num_Streams: 10000,
                Data_Lancamento: new Date("2023-01-01"),
            };
            await expect(MusicaService.create(invalidMusica as any)).rejects.toThrow(InvalidParamError);
        });
    });
    describe("findFromArtist", () => {
        test("artista válido fornecido => retorna musicas do artista", async () => {
            const musicasArtista = [{
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
            }]
        })
    })
});