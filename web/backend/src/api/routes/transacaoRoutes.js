const express = require('express')
const router = express.Router()
const TransacaoController = require('../controllers/transacaoController')

router.post('/transacao', TransacaoController.createTransacao)

module.exports = router