import "dotenv/config";
import express from "express"
import cors from "cors";
import multer from "multer";
import { connectDb } from "./config/db.js";

import exmployeesRouter from "./routes/employeeRoutes.js";
import authRouter from "./routes/authRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/AttendanceRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";
import paySlipRouter from "./routes/paySlipsRoutes.js";


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

app.use('/api/auth', authRouter);
app.use('/api/employees', exmployeesRouter);
app.use('/api/profile', profileRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/payslip', paySlipRouter);


await connectDb();

app.listen(PORT, () => {
    console.log(`server is running on port no ${PORT}`)
})