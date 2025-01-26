import { Router, Request, Response, NextFunction } from "express";
import MusicaService from "../services/MusicaService";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const novaMusica = await MusicaService.create(req.body);
        res.status(201).json(novaMusica);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicas = await MusicaService.findAll();
        res.json(musicas);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musica = await MusicaService.findById(Number(req.params.id));
        res.json(musica);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicaAtualizada = await MusicaService.update(Number(req.params.id), req.body);
        res.json(musicaAtualizada);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicaDeletada = await MusicaService.delete(Number(req.params.id));
        res.json(musicaDeletada);
    } catch (error) {
        next(error);
    }
});

export default router;