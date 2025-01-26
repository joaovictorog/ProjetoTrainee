import { Router, Request, Response, NextFunction } from "express";
import UsuarioService from "../services/UsuarioService";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const novoUsuario = await UsuarioService.create(req.body);
        res.status(201).json(novoUsuario);
    } catch (error) {
        next(error);
    }
});
