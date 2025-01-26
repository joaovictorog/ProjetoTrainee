import { Router, Request, Response, NextFunction } from "express";
import MusicasUsuarioService from "../services/Musicas_UsuarioService";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const novaMusicaUsuario = await MusicasUsuarioService.create(req.body);
        res.status(201).json(novaMusicaUsuario);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicasUsuario = await MusicasUsuarioService.findAll();
        res.json(musicasUsuario);
    } catch (error) {
        next(error);
    }
});

router.get("/:usuarioId/:musicaId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usuarioId, musicaId } = req.params;
        const musicaUsuario = await MusicasUsuarioService.findById(Number(usuarioId), Number(musicaId));
        res.json(musicaUsuario);
    } catch (error) {
        next(error);
    }
});

router.put("/:usuarioId/:musicaId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usuarioId, musicaId } = req.params;
        const musicaUsuarioAtualizada = await MusicasUsuarioService.update(
            Number(usuarioId),
            Number(musicaId),
            req.body
        );
        res.json(musicaUsuarioAtualizada);
    } catch (error) {
        next(error);
    }
});

router.delete("/:usuarioId/:musicaId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { usuarioId, musicaId } = req.params;
        const musicaUsuarioDeletada = await MusicasUsuarioService.delete(Number(usuarioId), Number(musicaId));
        res.json(musicaUsuarioDeletada);
    } catch (error) {
        next(error);
    }
});

export default router;
