import express, {Express, Request, Response} from "express";
import {port} from "./env.js";

// import * as process from "process";

const app: Express = express();

app.use(express.json());

app.get("/ok", (req: Request , res: Response) => {
    res.send("Server ok")
});

app.listen(port, () => {
    console.log(`[server] : Server is running at ${port}`);
});