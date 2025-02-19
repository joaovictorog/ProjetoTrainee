import MusicaService from "././MusicaService";
import { InvalidParamError } from "../../../../errors/InvalidParamError"; 
import { QueryError } from "../../../../errors/QueryError";
import { prismaMock } from "../../../../config/singleton";
import { mockReset } from "jest-mock-extended";

describe("MusicaService", () => {
    beforeEach(() => {
        mockReset(prismaMock);
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
        })

        test("tenta criar música sem gênero ==> lança InvalidParamError", async () => {
            const musica = {
                ID_Musica: 1,
                Nome: "Música Teste",
                ArtistaID: 2,
                Genero: null,
                AlbumID: 3,
                Num_Streams: 10000,
                Data_Lancamento: new Date("2023-01-01"),
            };
            await expect(MusicaService.create(musica as any)).resolves.toThrow(InvalidParamError);
        })
    });
