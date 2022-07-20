const express = require('express')
const router = express.Router()
const CartaoCreditoController = require('../controllers/cartaoCreditoController')

router.get('/cartaoCredito/:idTitular', CartaoCreditoController.show_cartaoCredito)

module.exports = router