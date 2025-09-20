import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import donorRoutes from "./routes/donor.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import recipientRoutes from "./routes/recipient.routes.js";

import connecttomongodb from "./db/mdbConnection.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 1234;

import cors from 'cors';

// CORS configuration


const allowedOrigins = [];
if (process.env.VITE_BACKEND_URL) allowedOrigins.push(process.env.VITE_BACKEND_URL);
if (process.env.VITE_FRONTEND_URL) allowedOrigins.push(process.env.VITE_FRONTEND_URL);

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"]
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/recipient", recipientRoutes);

app.listen(PORT,()=>{
    connecttomongodb()
    console.log(`server running in ${process.env.VITE_BACKEND_URL}`)
});
