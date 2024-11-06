import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config();

export const port = Number(process.env.PORT) || 3000;