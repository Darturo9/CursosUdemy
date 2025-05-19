import { Request, Response } from "express"
import slugify from 'slugify'
import User from "../models/User"
import { hashPassword } from "../utils/auth"

export const CreateAccount = async (req : Request, res : Response) => {

    const { email, password, handle } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        const error = new Error('El usuario ya esta registrado')
        res.status(409).json({ error: error.message })
        return
    } 

    const user = new User(req.body)
    user.password = await hashPassword(password)
    console.log(slugify(handle))
    console.log("Prueba")
    await user.save()


    res.status(201).send("Registro Creado Correctamente")

}