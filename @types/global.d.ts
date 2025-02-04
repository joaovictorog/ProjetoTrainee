import { Usuario } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            user: Usuario;
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            APP_URL: string;
            PORT: number;
            DATABASE_URL: string;
            SECRET_KEY: string;
            JWT_EXPIRATION: string;
            NODE_ENV: string;
        }
    }
}

export {};