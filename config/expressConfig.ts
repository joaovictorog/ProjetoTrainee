import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";

export const app: Express = express();

dotenv.config();

const options: CorsOptions = {
    credentials: true,
    origin: process.env.APP_URL
}

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


