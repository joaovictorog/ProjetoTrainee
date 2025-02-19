import ArtistaService from "./ArtistaService";
import { prismaMock } from "../../../../config/singleton";
import { mockReset } from "jest-mock-extended";

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
    describe("")

});