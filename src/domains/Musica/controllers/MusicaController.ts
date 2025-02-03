import { Router, Request, Response, NextFunction } from "express";
import MusicaService from "../services/MusicaService";
import statusCodes from "../../../../utils/constants/statusCodes";

const router = Router();

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const novaMusica = await MusicaService.create(req.body);
        res.status(statusCodes.SUCCESS).json(novaMusica);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicas = await MusicaService.findAll();
        res.status(statusCodes.SUCCESS).json(musicas);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musica = await MusicaService.findById(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(musica);
    } catch (error) {
        next(error);
    }
});

router.put("/update/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicaAtualizada = await MusicaService.update(Number(req.params.id), req.body);
        res.status(statusCodes.SUCCESS).json(musicaAtualizada);
    } catch (error) {
        next(error);
    }
});

router.delete("/delete/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicaDeletada = await MusicaService.delete(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(musicaDeletada);
    } catch (error) {
        next(error);
    }
});

export default router;