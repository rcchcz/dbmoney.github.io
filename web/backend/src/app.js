const express = require('express')
const cors = require('cors')

const routesUser = require('./api/routes/userRoutes')
const routesConta = require('./api/routes/contaRoutes')

const app = express()
const port = 3000

app.use(cors())
app.use('/static', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routesUser)
app.use(routesConta)

app.listen(port, () => { 
    console.log('Servidor rodando na porta ', port)
})