import AlbumService from "./AlbumService";
import { prismaMock } from "../../../../config/singleton";
import { mockReset } from "jest-mock-extended";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { QueryError } from "../../../../errors/QueryError";

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
    describe("findAll", ()=>{
        test("albuns existentes ==> retorna todos os albuns", async () => {
            const existingAlbum = [{ 
                ID_Album: 1,
                Nome: "album",
                ArtistaID: 1,
                Data_Lancamento: new Date("2020-01-01"),
                Capa: "capa.jpg",
                Num_Musicas: 10
            }];
            prismaMock.album.findMany.mockResolvedValue(existingAlbum);
        
            await expect(AlbumService.findAll()).resolves.toEqual(existingAlbum);
        });
        test("albuns inexistentes ==> lança QueryError", async () => {
            prismaMock.album.findMany.mockResolvedValue([]);
            await expect(AlbumService.findAll()).rejects.toThrow(QueryError);
        });
    });
    describe("findById", async () => {
        test("album existe ==> retorna o album", async ()=>{
            const existingAlbum = { 
                ID_Album: 1,
                Nome: "album",
                ArtistaID: 1,
                Data_Lancamento: new Date("2020-01-01"),
                Capa: "capa.jpg",
                Num_Musicas: 10
            };
            prismaMock.album.findUnique.mockResolvedValue(existingAlbum);

            await expect(AlbumService.findById(existingAlbum.ID_Album)).resolves.toEqual(existingAlbum);
        });
        test("album inexistente ==> lança Query error", async () => {
            prismaMock.album.findUnique.mockResolvedValue(null);
            await expect(AlbumService.findById(1)).rejects.toThrow(QueryError);
        });
        test("ID não fornecido ==> lança InvalidParamError", async () => {
             await expect(AlbumService.findById(null as any)).rejects.toThrow(InvalidParamError);
        });

    });
    describe("update", async () => {
        test("dados válidos ==> retorna o album atualizado", async () => {
            const Album = { 
                ID_Album: 1,
                Nome: "album",
                ArtistaID: 1,
                Data_Lancamento: new Date("2020-01-01"),
                Capa: "capa.jpg",
                Num_Musicas: 10
            };
            
            const updatedAlbum = { 
                ID_Album: 1,
                Nome: "album_atualizado",
                ArtistaID: 1,
                Data_Lancamento: new Date("2020-01-01"),
                Capa: "capa.jpg",
                Num_Musicas: 12
            };

            prismaMock.album.findUnique.mockResolvedValue(Album);
            prismaMock.album.update.mockResolvedValue(updatedAlbum);

            await expect(AlbumService.update(1, updatedAlbum)).toEqual(updatedAlbum);
        });
        test("album com ID informado inexistente ==> lança QueryError", async () => {
            prismaMock.album.findUnique.mockResolvedValue(null);
            
            await expect(AlbumService.update(2, null as any)).toThrow(QueryError);
        });
    });
    describe("delete", async () => {
        test("dados válidos ==> album deletedo com sucesso", async () => {
            const Album = { 
                ID_Album: 1,
                Nome: "album",
                ArtistaID: 1,
                Data_Lancamento: new Date("2020-01-01"),
                Capa: "capa.jpg",
                Num_Musicas: 10
            };
            const deletedAlbumResponse = { message: "Album deletado com sucesso" };

            prismaMock.album.findUnique.mockResolvedValue(Album);
            await expect(AlbumService.delete(1)).toEqual(deletedAlbumResponse);
        });
        test("Album não encontrado ==> lança QueryError", async () => {
            prismaMock.album.findUnique.mockResolvedValue(null);
            await expect(AlbumService.delete(2)).toThrow(QueryError);
        })
    })
}
);