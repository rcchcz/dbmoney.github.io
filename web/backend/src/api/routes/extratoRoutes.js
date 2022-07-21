const express = require('express')
const router = express.Router()
const ExtratoController = require('../controllers/extratoController')

router.post('/extrato', ExtratoController.createExtrato)

module.exports = router