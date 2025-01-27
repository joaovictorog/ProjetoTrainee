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
