const express = require('express')
const router = express.Router()
const SaqueController = require('../controllers/saqueController')

router.post('/saque/:idOperacao/:idTerminal', SaqueController.createSaque)

module.exports = router