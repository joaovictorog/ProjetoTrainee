import AlbumService from "./AlbumService";
import { prismaMock } from "../../../../config/singleton";
import { mockReset } from "jest-mock-extended";
import { InvalidParamError } from "../../../../errors/InvalidParamError";
import { QueryError } from "../../../../errors/QueryError";
import { Album } from "@prisma/client";

describe("AlbumService", () => {
    beforeEach(()=>{
        mockReset(prismaMock);
    })

    describe("create", () => {
        test("recebe dados válidos de usuário ==> cria um novo album", async () => {
            const artista = {
                ID_Artista: 1,
                Nome: "nome",
                Foto: "foto",
                Num_Streams: 5
            };
            
            const album = { 
                ID_Album: 1,
                Nome: "Album",
                ArtistaID: 1,
                Data_Lancamento: new Date("2020-01-01"),
                Capa: "capa.jpg",
                Num_Musicas: 10
            };
            prismaMock.artista.findUnique.mockResolvedValue(artista);
        
            prismaMock.album.create.mockResolvedValue(album);
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
    });
    describe("findById", () => {
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
    });
    describe("findFromArtista", () => {
        test("dados válidos ==> retorna os albums de um artista", async () => {
            const Artista = {
                ID_Artista : 1,
                Nome: "nome",
                Foto: "jpg",
                Num_Streams: 5
            };

            const Album = [{ 
                ID_Album: 1,
                Nome: "album",
                ArtistaID: 1,
                Data_Lancamento: new Date("2020-01-01"),
                Capa: "capa.jpg",
                Num_Musicas: 10
            }];
            prismaMock.artista.findUnique.mockResolvedValue(Artista);
            prismaMock.album.findMany.mockResolvedValue(Album);
            await expect(AlbumService.findFromArtista(1)).resolves.toEqual(Album);
        });
        test("artista inexistente ==> lança query error", async () => {
            prismaMock.artista.findUnique.mockResolvedValue(null);
            await expect(AlbumService.findFromArtista(1)).rejects.toThrow(QueryError);
        })
    })
    describe("update", () => {
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

            await expect(AlbumService.update(1, updatedAlbum)).resolves.toEqual(updatedAlbum);
        });
        test("album com ID informado inexistente ==> lança QueryError", async () => {
            prismaMock.album.findUnique.mockResolvedValue(null);
            
            await expect(AlbumService.update(2, null as any)).rejects.toThrow(QueryError);
        });
    });
    describe("delete", () => {
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
            await expect(AlbumService.delete(1)).resolves.toEqual(deletedAlbumResponse);
        });
        test("Album não encontrado ==> lança QueryError", async () => {
            prismaMock.album.findUnique.mockResolvedValue(null);
            await expect(AlbumService.delete(2)).rejects.toThrow(QueryError);
        })
    })
}
);