import express, { Request, Response } from "express";
import "dotenv/config";
import { connectDB } from "./config/db";
import cors from "cors";
import http from "http";
import "dotenv/config";
import yearRouter from "./routes/Year.route";
import attackRouter from "./routes/attack.router";


const PORT = process.env.PORT || 3000;

export const app = express();
export const server = http.createServer(app);
( async () => await connectDB())();

app.use(cors());
app.use(express.json());

app.use("/api/year", yearRouter)
app.use("/api/typesAttack", attackRouter)
app.use("/api/", ()=>{})

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong");
});

// io.on("connection", handelSocketConnection);

server.listen(PORT, () =>
  console.log(`Listening on port ${PORT},visit http://localhost:${PORT}`)
);
