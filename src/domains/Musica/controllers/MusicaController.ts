import { Router, Request, Response, NextFunction } from "express";
import MusicaService from "../services/MusicaService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, verifyJWT } from "../../../middlewares/auth";
import { ordenarAlfabetica } from "../../../../utils/functions/ordemAlfabetica";

const router = Router();

router.get("/artista/:id", verifyJWT, checkRole(["admin", "user"]), async (req:Request, res: Response, next: NextFunction) => {
    try {
        let musicasArtista = await MusicaService.findFromArtist(Number(req.params.id))
        ordenarAlfabetica(musicasArtista);
        res.status(statusCodes.SUCCESS).json(musicasArtista)
    } catch (error) {
        next(error)
    }
})

router.post("/create", verifyJWT, checkRole(["admin"]) ,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const novaMusica = await MusicaService.create(req.body);
        res.status(statusCodes.SUCCESS).json(novaMusica);
    } catch (error) {
        next(error);
    }
});

router.get("/", verifyJWT, checkRole(["admin", "user"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        let musicas = await MusicaService.findAll();
        ordenarAlfabetica(musicas);
        res.status(statusCodes.SUCCESS).json(musicas);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", verifyJWT, checkRole(["admin", "user"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musica = await MusicaService.findById(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(musica);
    } catch (error) {
        next(error);
    }
});

router.put("/update/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicaAtualizada = await MusicaService.update(Number(req.params.id), req.body);
        res.status(statusCodes.SUCCESS).json(musicaAtualizada);
    } catch (error) {
        next(error);
    }
});

router.delete("/delete/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musicaDeletada = await MusicaService.delete(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(musicaDeletada);
    } catch (error) {
        next(error);
    }
});

export default router;