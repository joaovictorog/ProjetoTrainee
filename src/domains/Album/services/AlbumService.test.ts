import AlbumService from "./AlbumService";
import { prismaMock } from "../../../../config/singleton";
import { mockReset } from "jest-mock-extended";
import { InvalidParamError } from "../../../../errors/InvalidParamError";

describe("AlbumService", () => {
    beforeEach(()=>{
        mockReset(prismaMock);
    })

    describe("create", () => {
        test("recebe dados válidos de usuário ==> cria um novo album", async () => {
            const album = { 
                ID_Album: 1,
                Nome: "Album",
                ArtistaID: 1,
                Data_Lancamento: new Date("2020-01-01"),
                Capa: "capa.jpg",
                Num_Musicas: 10
            };
        
            prismaMock.album.create.mockResolvedValue(album)
            await expect(AlbumService.create(album)).resolves.toEqual(album);
        });
        test("tenta criar album sem nome ==> lança InvalidParamError", async () => {
            const album = { 
                ID_Album: 1,
                Nome: null,
                ArtistaID: 1,
                Data_Lancamento: new Date("2020-01-01"),
                Capa: "capa.jpg",
                Num_Musicas: 10
            }; 
            await expect(AlbumService.create(album as any)).rejects.toThrow(InvalidParamError);
        });
        test("tenta criar um album sem pertencer a um artista ==> lança InvalidParamError", async () => {
            const invalidAlbum = { 
                ID_Album: 1,
                Nome: null,
                ArtistaID: 1,
                Data_Lancamento: new Date("2020-01-01"),
                Capa: "capa.jpg",
                Num_Musicas: 10
            };
            await expect(AlbumService.create(invalidAlbum as any)).rejects.toThrow(InvalidParamError);
        });
    });
}
);