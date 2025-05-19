import { Router } from "express";
import { CreateAccount } from "./handlers";

const router = Router()

router.post('/auth/register', CreateAccount )

export default router