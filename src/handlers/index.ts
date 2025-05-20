import { Request, Response } from "express"
import slugify from 'slugify'
import {body, validationResult} from 'express-validator'
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import slug from "slug"

export const CreateAccount = async (req : Request, res : Response) => {

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        const error = new Error('El correo ya esta registrado')
        res.status(409).json({ error: error.message })
        return
    } 

    const handle = slugify(req.body.handle, '')
    const handleExists = await User.findOne({ handle })
    if (handleExists) {
        const error = new Error('Nombre de usuario no disponible')
        res.status(409).json({ error: error.message })
        return
    } 

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle
    await user.save()


    res.status(201).send("Registro Creado Correctamente")

}

export const login = async (req : Request,res : Response) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }

    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('El correo no existe')
        res.status(404).json({ error: error.message })
        return
    } 
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error('Contraseña incorrecta')
        res.status(401).json({ error: error.message })
        return
    } 

    res.send('Autenticado...')
}