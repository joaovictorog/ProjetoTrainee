import prisma from "../../config/prismaClient";
import statusCodes from "../../utils/constants/statusCodes";
import { Request, Response, NextFunction } from "express";
import { Usuario } from "@prisma/client";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { TokenError } from "../../errors/TokenError";
import { PermissionError } from "../../errors/PermissionError";
import { compare } from "bcrypt";

function generateJWT(user: Usuario, res: Response) {
    const body = {
        id: user.ID_Usuario,
        email: user.Email,
        nome: user.Nome,
        isAdmin: user.isAdmin
    };

    const token = sign({user: body}, process.env.SECRET_KEY || ""/*, {expiresIn: process.env.JWT_EXPIRATION}*/);

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development"
    })
}

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

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await prisma.usuario.findUnique({
            where: {
                Email: req.body.email
            }
        });

        if(!user) {
            throw new PermissionError("Email e/ou senha incorretos!")
        }

        const match = compare(req.body.password, user.Senha);

        if(!match) {
            throw new PermissionError("Email e/ou senha incorretos!");
        }

        generateJWT(user, res);

        res.status(statusCodes.SUCCESS).json("Login realizado com sucesso!");
    } catch (error) {
        next(error);
    }
}