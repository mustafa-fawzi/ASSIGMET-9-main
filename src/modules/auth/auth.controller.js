import { Router } from "express";
import *as authservice from "./auth.service.js"
import usermodel from "../../DB/models/user.model.js";

const router = Router();
router.post("/create",authservice.cerateuser);

router.post("/login",authservice.serachuser);
router.patch("/update",authservice.updateUser);
router.delete("/delate",authservice.deleteUser);
router.get("/get",authservice.getusers);


export default router;