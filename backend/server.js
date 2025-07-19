import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

import connecttomongodb from "./db/mdbConnection.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 1000;
const FRONTEND_PORT = process.env.FRONTEND_PORT || 1001;

import cors from 'cors';
app.use(cors({
    origin: `http://localhost:${FRONTEND_PORT}`, // Replace with your frontend URL
  }));

app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRoutes);

app.listen(PORT,()=>{
    connecttomongodb()
    console.log(`server running in port ${PORT}`)
});
