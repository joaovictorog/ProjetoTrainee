import ArtistaService from "./ArtistaService";
import { prismaMock } from "../../../../config/singleton";
import { mockReset } from "jest-mock-extended";
import { QueryError } from "../../../../errors/QueryError";
import { query } from "express";

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
    describe("update", () => {
        test("Dados Válidos ==> Atualiza o artista", async () => {
            const artista = {
                ID_Artista: 1,
                Nome: "Artista",
                Foto: null,
                Num_Streams: 200
            };
            const updatedArtista = {
                ID_Artista: 1,
                Nome: "ArtistaAtualizado",
                Foto: null,
                Num_Streams: 200
            };

            prismaMock.artista.findUnique.mockResolvedValue(artista);
            prismaMock.artista.update.mockResolvedValue(updatedArtista);
            await expect(ArtistaService.update(1,updatedArtista)).resolves.toEqual(updatedArtista);
        });
        test("Artista não encontrado ==> lança QueryError", async () => {
            const updatedArtista = {
                ID_Artista: 1,
                Nome: "ArtistaAtualizado",
                Foto: null,
                Num_Streams: 200
            };
            
            prismaMock.artista.findUnique.mockResolvedValue(null);
            await expect(ArtistaService.update(1, updatedArtista)).rejects.toThrow(QueryError);
        });
    });
    describe("delete", () => {
        test("Artista existe ==> Artista deletado", async () => {
            const Artista = {
                ID_Artista: 1,
                Nome: "Artista",
                Foto: null,
                Num_Streams: 200
            };
            prismaMock.artista.findUnique.mockResolvedValue(Artista);
            const deletedArtistaMsg = { message: "Artista deletado com sucesso!" };
            prismaMock.artista.delete.mockResolvedValue(Artista);
            await expect(ArtistaService.delete(1)).resolves.toEqual(deletedArtistaMsg);
        });
        test("Artista não encontrado ==> lança QueryError", async () => {
            prismaMock.artista.findUnique.mockResolvedValue(null);
            await expect(ArtistaService.delete(1)).rejects.toThrow(QueryError);
        })
    })

});