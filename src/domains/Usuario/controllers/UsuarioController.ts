import { Router, Request, Response, NextFunction } from "express";
import UsuarioService from "../services/UsuarioService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { verifyJWT, checkRole } from "../../../../middlewares/auth"; // Importando os middlewares

const router = Router();

// Criar conta (usuário normal) - não requer autenticação
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
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

// Login - não requer autenticação (não implementado aqui, mas mencionado na atividade)

// Listar todos os usuários (somente ADMIN)
router.get("/", verifyJWT, checkRole("ADMIN"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarios = await UsuarioService.findAll();
        res.status(statusCodes.SUCCESS).json(usuarios);
    } catch (error) {
        next(error);
    }
});

// Visualizar conta do próprio usuário (Usuário e Admin)
router.get("/account", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = await UsuarioService.findById(req.user.ID_Usuario);
        res.status(statusCodes.SUCCESS).json(usuario);
    } catch (error) {
        next(error);
    }
});

// Visualizar usuário específico (somente ADMIN)
router.get("/:id", verifyJWT, checkRole("ADMIN"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = await UsuarioService.findById(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(usuario);
    } catch (error) {
        next(error);
    }
});

// Editar conta do próprio usuário ou permitir que ADMIN edite qualquer conta
router.put("/account/update", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioAtualizado = await UsuarioService.update(req.user.ID_Usuario, req.body, req.user);
        res.status(statusCodes.SUCCESS).json(usuarioAtualizado);
    } catch (error) {
        next(error);
    }
});

// Editar qualquer usuário (somente ADMIN)
router.put("/update/:id", verifyJWT, checkRole("ADMIN"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioAtualizado = await UsuarioService.update(Number(req.params.id), req.body, req.user);
        res.status(statusCodes.SUCCESS).json(usuarioAtualizado);
    } catch (error) {
        next(error);
    }
});

// Alterar senha do próprio usuário
router.put("/account/password", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioAtualizado = await UsuarioService.update(req.user.ID_Usuario, { Senha: req.body.Senha }, req.user);
        res.status(statusCodes.SUCCESS).json(usuarioAtualizado);
    } catch (error) {
        next(error);
    }
});

// Excluir conta do próprio usuário
router.delete("/account/delete", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioDeletado = await UsuarioService.delete(req.user.ID_Usuario, req.user);
        res.status(statusCodes.SUCCESS).json(usuarioDeletado);
    } catch (error) {
        next(error);
    }
});

// Excluir qualquer usuário (somente ADMIN)
router.delete("/delete/:id", verifyJWT, checkRole("ADMIN"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioDeletado = await UsuarioService.delete(Number(req.params.id), req.user);
        res.status(statusCodes.SUCCESS).json(usuarioDeletado);
    } catch (error) {
        next(error);
    }
});

export default router;