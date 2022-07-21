const express = require('express')
const router = express.Router()
const OperacaoController = require('../controllers/operacaoController')

router.post('/operacao', OperacaoController.createOperacao)

module.exports = router