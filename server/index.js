import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

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

app.use(cookieParser());
app.use(express.json());

const server = app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
})

mongoose.connect(databaseURL)
    .then(()=>console.log("database connected")).catch(err=>console.log(err.message));