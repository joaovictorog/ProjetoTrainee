import { Router, Request, Response, NextFunction } from "express";
import AlbumService from "../services/AlbumService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, verifyJWT } from "../../../middlewares/auth";
import { ordenarAlfabetica } from "../../../../utils/functions/ordemAlfabetica";

const router = Router()

router.get("/", verifyJWT, checkRole(["admin", "user"]), async (req:Request, res:Response, next:NextFunction) => {
    try {
        let albuns = await AlbumService.findAll()
        ordenarAlfabetica(albuns);
        res.status(statusCodes.SUCCESS).json(albuns);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", checkRole(["admin", "user"]),verifyJWT, async (req:Request, res:Response, next:NextFunction) => {
    try {
        const album = await AlbumService.findById(Number(req.params.id))
        res.status(statusCodes.SUCCESS).json(album);
    } catch (error) {
        next(error);
    } 
});

router.post("/create", verifyJWT, checkRole(["admin"]), async (req:Request, res:Response, next:NextFunction) => {
    try {
        const novoAlbum = await AlbumService.create(req.body)
        res.status(statusCodes.SUCCESS).json(novoAlbum)
    } catch (error) {
        next(error)
    } 
});

router.put("/update/:id", verifyJWT, checkRole(["admin"]),async (req:Request, res:Response, next:NextFunction) => {
    try {
        const updatedAlbum = await AlbumService.update(Number(req.params.id), req.body)
        res.status(statusCodes.SUCCESS).json(updatedAlbum)
    } catch (error) {
        next(error)
    }
});

router.delete("/delete/:id", verifyJWT, checkRole(["admin"]), async (req:Request, res:Response, next:NextFunction) => {
    try {
        const deletedAlbum = await AlbumService.delete(Number(req.params.id))
        res.status(statusCodes.SUCCESS).json(deletedAlbum)
    } catch (error) {
        next(error)
    }
});

export default router;