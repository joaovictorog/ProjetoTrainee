import { Router, Request, Response, NextFunction } from "express";
import AlbumService from "../services/AlbumService";
import statusCodes from "../../../../utils/constants/statusCodes";

const router = Router()

router.get("/", async (req:Request, res:Response, next:NextFunction) => {
    try {
        const albuns = await AlbumService.findAll()
        res.json(albuns);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req:Request, res:Response, next:NextFunction) => {
    try {
        const album = await AlbumService.findById(Number(req.params.id))
        res.json(album);
    } catch (error) {
        next(error);
    } 
});

router.post("/create", async (req:Request, res:Response, next:NextFunction) => {
    try {
        const novoAlbum = await AlbumService.create(req.body)
        res.status(statusCodes.SUCCESS).json(novoAlbum)
    } catch (error) {
        next(error)
    } 
});

router.put("/update/:id", async (req:Request, res:Response, next:NextFunction) => {
    try {
        const updatedAlbum = await AlbumService.update(Number(req.params.id), req.body)
        res.status(statusCodes.SUCCESS).json(updatedAlbum)
    } catch (error) {
        next(error)
    }
});

router.delete("/delete/:id", async (req:Request, res:Response, next:NextFunction) => {
    try {
        const deletedAlbum = await AlbumService.delete(Number(req.params.id))
        res.status(statusCodes.SUCCESS).json(deletedAlbum)
    } catch (error) {
        next(error)
    }
});

export default router;