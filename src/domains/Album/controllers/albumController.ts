import { Router, Request, Response, NextFunction } from "express";
import AlbumService from "../services/AlbumService";

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

router.post("/", async (req:Request, res:Response, next:NextFunction) => {
   try {
    const novoAlbum = await AlbumService.create(req.body)
    res.status(201).json(novoAlbum)
   } catch (error) {
    next(error)
   } 
});

