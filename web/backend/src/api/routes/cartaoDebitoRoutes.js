const express = require('express')
const router = express.Router()
const CartaoDebitoController = require('../controllers/cartaoDebitoController')

router.get('/cartaoDebitoDependente/:idTitular', CartaoDebitoController.show_cartaoDebitoDependente)
router.get('/cartaoDebitoTitular/:idTitular', CartaoDebitoController.show_cartaoDebitoTitular)
router.put('/cartaoDebito/:valor/:numCartao/:isTitular', CartaoDebitoController.subtractSaldo)


module.exports = router