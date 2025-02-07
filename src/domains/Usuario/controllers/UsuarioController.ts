import { Router, Request, Response, NextFunction } from "express";
import UsuarioService from "../services/UsuarioService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { verifyJWT, checkRole, login } from "../../../middlewares/auth";
import { ordenarAlfabetica } from "../../../../utils/functions/ordemAlfabetica";

const router = Router();

router.post("/login", login)

router.post("/admin/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.isAdmin) {
            return res.status(statusCodes.FORBIDDEN).json({ message: "Não é permitido criar conta de administrador." });
        }
        const novoUsuario = await UsuarioService.create(req.body);
        res.status(statusCodes.SUCCESS).json(novoUsuario);
    } catch (error) {
        next(error);
    }
});

router.get("/", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarios = await UsuarioService.findAll();
        ordenarAlfabetica(usuarios);
        res.status(statusCodes.SUCCESS).json(usuarios);
    } catch (error) {
        next(error);
    }
});

router.get("/account", verifyJWT, checkRole(["admin", "user"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.user);
        const usuario = await UsuarioService.findById(req.user.ID_Usuario);
        res.status(statusCodes.SUCCESS).json(usuario);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = await UsuarioService.findById(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(usuario);
    } catch (error) {
        next(error);
    }
});

router.put("/account/update", verifyJWT, checkRole(["admin", "user"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioAtualizado = await UsuarioService.update(req.user.ID_Usuario, req.body, req.user);
        res.status(statusCodes.SUCCESS).json(usuarioAtualizado);
    } catch (error) {
        next(error);
    }
});

router.put("/update/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioAtualizado = await UsuarioService.update(Number(req.params.id), req.body, req.user);
        res.status(statusCodes.SUCCESS).json(usuarioAtualizado);
    } catch (error) {
        next(error);
    }
});

router.put("/account/password", verifyJWT, checkRole(["admin", "user"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioAtualizado = await UsuarioService.update(req.user.ID_Usuario, { Senha: req.body.Senha }, req.user);
        res.status(statusCodes.SUCCESS).json(usuarioAtualizado);
    } catch (error) {
        next(error);
    }
});

router.delete("/account/delete", verifyJWT, checkRole(["admin", "user"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioDeletado = await UsuarioService.delete(req.user.ID_Usuario, req.user);
        res.status(statusCodes.SUCCESS).json(usuarioDeletado);
    } catch (error) {
        next(error);
    }
});

router.delete("/delete/:id", verifyJWT, checkRole(["admin"]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioDeletado = await UsuarioService.delete(Number(req.params.id), req.user);
        res.status(statusCodes.SUCCESS).json(usuarioDeletado);
    } catch (error) {
        next(error);
    }
});

export default router;