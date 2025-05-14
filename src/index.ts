import express from 'express'

const app = express()

//Routing
app.get('/', (req,res) => {
    
    res.send('Hola mundo')

})

const port = process.env.port || 4000

app.listen(port, () => {
    console.log("Servidor Funcionando en el puerto: ", port)
})