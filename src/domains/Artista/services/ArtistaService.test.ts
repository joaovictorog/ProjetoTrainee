import ArtistaService from "./ArtistaService";
import { prismaMock } from "../../../../config/singleton";
import { mockReset } from "jest-mock-extended";
import { QueryError } from "../../../../errors/QueryError";

describe("ArtistaService", () => {
    beforeEach(() => {
        mockReset(prismaMock);
    });

    describe("create", () => {
        test("dados válidos ==> cria um novo artista", async () => {
            const artista = {
                ID_Artista: 1,
                Nome: "Artista",
                Foto: null,
                Num_Streams: 200
            };
            prismaMock.artista.create.mockResolvedValue(artista);

            await expect(ArtistaService.create(artista)).resolves.toEqual(artista);
        });
    });
    describe("findAll", () => {
        test("dados válidos ==> retorna todos os artistas", async () => {
            const artista = [{
                ID_Artista: 1,
                Nome: "Artista",
                Foto: null,
                Num_Streams: 200
            }];
            
            prismaMock.artista.findMany.mockResolvedValue(artista);
            await expect(ArtistaService.findAll()).resolves.toEqual(artista);
        });
    });
    describe("findById", () => {
        test("Artista existe ==> retorna o artista", async () => {
            const artista = {
                ID_Artista: 1,
                Nome: "Artista",
                Foto: null,
                Num_Streams: 200
            };
            prismaMock.artista.findUnique.mockResolvedValue(artista);
            await expect(ArtistaService.findById(1)).resolves.toEqual(artista);
        });
        test("Artista não exitste ==> lança QueryError", async () => {
            prismaMock.artista.findUnique.mockResolvedValue(null);
            await expect(ArtistaService.findById(1)).rejects.toThrow(QueryError);
        });
    });

});