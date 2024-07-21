import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

app.use(
    cors({
        origin: [process.env.ORIGIN],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api/contacts", contactsRoutes); 

const server = app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
})

mongoose.connect(databaseURL)
    .then(()=>console.log("database connected")).catch(err=>console.log(err.message));