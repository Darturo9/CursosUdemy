import { Router } from "express";
import {body } from 'express-validator'
import { CreateAccount, login } from "./handlers";

const router = Router()

router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El Handle no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El Nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('E-mail Invalido'),
    body('passwords')
        .isLength({min: 8})
        .withMessage('La contraseña debe tener mas de 8 caracteres'),
    CreateAccount)

    
router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('E-mail Invalido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
    login
)

export default router

