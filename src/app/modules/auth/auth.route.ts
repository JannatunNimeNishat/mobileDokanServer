import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controller";

const router = Router();


router.post('/login',validateRequest(authValidations.loginValidationSchema),authControllers.loginUser)




export const authRoutes = router;