import { Router } from "express";
import *as authservice from "./auth.service.js"

const router = Router();
router.post("/create",authservice.cerateuser);

router.post("/login",authservice.serachuser);



export default router;