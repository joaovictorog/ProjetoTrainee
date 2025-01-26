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
