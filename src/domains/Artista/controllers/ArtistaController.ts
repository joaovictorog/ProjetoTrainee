import { Router, Request, Response, NextFunction } from "express";
import ArtistaService from "../services/ArtistaService";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const novoArtista = await ArtistaService.create(req.body);
        res.status(201).json(novoArtista);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistas = await ArtistaService.findAll();
        res.json(artistas);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artista = await ArtistaService.findById(Number(req.params.id));
        res.json(artista);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistaAtualizado = await ArtistaService.update(Number(req.params.id), req.body);
        res.json(artistaAtualizado);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistaDeletado = await ArtistaService.delete(Number(req.params.id));
        res.json(artistaDeletado);
    } catch (error) {
        next(error);
    }
});

export default router;
