import { Router, Request, Response, NextFunction } from "express";
import UsuarioService from "../services/UsuarioService";
import statusCodes from "../../../../utils/constants/statusCodes";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const novoUsuario = await UsuarioService.create(req.body);
        res.status(statusCodes.SUCCESS).json(novoUsuario);
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarios = await UsuarioService.findAll();
        res.status(statusCodes.SUCCESS).json(usuarios);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = await UsuarioService.findById(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(usuario);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioAtualizado = await UsuarioService.update(Number(req.params.id), req.body);
        res.status(statusCodes.SUCCESS).json(usuarioAtualizado);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioDeletado = await UsuarioService.delete(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(usuarioDeletado);
    } catch (error) {
        next(error);
    }
});

export default router;
