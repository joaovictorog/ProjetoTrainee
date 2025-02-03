import { Router, Request, Response, NextFunction } from "express";
import ArtistaService from "../services/ArtistaService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, verifyJWT } from "../../../middlewares/auth";

const router = Router();

router.post("/create", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const novoArtista = await ArtistaService.create(req.body);
        res.status(statusCodes.SUCCESS).json(novoArtista);
    } catch (error) {
        next(error);
    }
});

router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistas = await ArtistaService.findAll();
        res.status(statusCodes.SUCCESS).json(artistas);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artista = await ArtistaService.findById(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(artista);
    } catch (error) {
        next(error);
    }
});

router.put("/update/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistaAtualizado = await ArtistaService.update(Number(req.params.id), req.body);
        res.status(statusCodes.SUCCESS).json(artistaAtualizado);
    } catch (error) {
        next(error);
    }
});

router.delete("/delete/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artistaDeletado = await ArtistaService.delete(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(artistaDeletado);
    } catch (error) {
        next(error);
    }
});

export default router;
