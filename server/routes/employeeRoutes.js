import { Router } from "express";

import { protect, adminProtect } from "../middleware/auth.js";

import { getEmployee, updateEmployee, createEmployee, deleteEmployee } from "../controllers/employeeController.js";


const exmployeesRouter = Router();

exmployeesRouter.get("/",protect,adminProtect,getEmployee);
exmployeesRouter.post("/",protect,adminProtect,createEmployee);
exmployeesRouter.put("/:id",protect,adminProtect,updateEmployee);
exmployeesRouter.delete("/:id",protect,adminProtect,deleteEmployee);

export default exmployeesRouter;