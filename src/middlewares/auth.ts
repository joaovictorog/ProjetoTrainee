import { Request, Response, NextFunction } from "express";
import { Usuario } from "@prisma/client";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { TokenError } from "../../errors/TokenError";

function cookieExtractor(req: Request) {
    let token = null;
    if(req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);

        if(token) {
            const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
            req.user = decoded.user;
        }

        if(req.user == null) {
            throw new TokenError("Você precisa estar logado para realizar essa ação!")
        }

        next();
    } catch (error) {
        next(error);
    }
}
