const express = require('express')
const cors = require('cors')

const routesManager = require('./api/routes/managerRoutes')
const routesDependent = require('./api/routes/dependentRoutes')
const routesTitular = require('./api/routes/titularRoutes')
const routesConta = require('./api/routes/contaRoutes')
const routesCartao = require('./api/routes/cartaoRoutes')
const routesCartaoCredito = require('./api/routes/cartaoCreditoRoutes')
const routesCartaoDebito = require('./api/routes/cartaoDebitoRoutes')
const routesEmprestimo = require('./api/routes/emprestimoRoutes')

const routesUser = require('./api/routes/userRoutes')
const routesConta = require('./api/routes/contaRoutes')


const app = express()
const port = 3000

app.use(cors())
app.use('/static', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routesManager)
app.use(routesDependent)
app.use(routesTitular)
app.use(routesConta)
app.use(routesCartao)
app.use(routesCartaoCredito)
app.use(routesCartaoDebito)
app.use(routesEmprestimo)
app.use(routesUser)

app.listen(port, () => { 
    console.log('Servidor rodando na porta ', port)
})