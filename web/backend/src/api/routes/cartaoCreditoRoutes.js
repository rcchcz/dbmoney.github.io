const express = require('express')
const router = express.Router()
const CartaoCreditoController = require('../controllers/cartaoCreditoController')

router.get('/cartaoCredito/:idTitular', CartaoCreditoController.show_cartaoCredito)
router.get('/cartaoCredito/getFatura/:id',CartaoCreditoController.getFatura)
router.get('/cartaoCredito/pagarFatura/:id',CartaoCreditoController.pagarFatura)

module.exports = router