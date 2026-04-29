import express from "express"
import cors from "cors";
import multer from "multer";
import { connectDb } from "./config/db.js";


const app = express()

const PORT = 4002;


//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(multer().none());


//Routes
app.get('/', (req, res) =>
    res.send("server is running")
);


await connectDb();



app.listen(PORT, () => {
    console.log(`server is running on port no ${PORT}`)
})