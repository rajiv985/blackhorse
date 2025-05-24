import {register,login, verifyOTP} from "../controllers/auth.controllers.js";  

import { Router } from "express";  


const router =Router(); 

router.route("/register").post(register);  
router.route("/login").post(login); 
router.route("/verifyOTP").post(verifyOTP);   
 
export default router;



