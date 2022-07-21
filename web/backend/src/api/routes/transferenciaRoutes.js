const express = require('express')
const router = express.Router()
const TransferenciaController = require('../controllers/transferenciaController')

router.post('/transferencia/:id', TransferenciaController.createTransferencia)

module.exports = router