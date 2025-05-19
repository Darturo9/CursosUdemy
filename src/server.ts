import express from 'express'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'

const app = express()

connectDB()

//leer los datos desde el formulario

app.use(express.json())

//leer los datos desde el fomulario

app.use('/',router)

export default app
