const express = require('express')
const router = express.Router()
const RealizaController = require('../controllers/realizaController')

router.post('/realiza', RealizaController.createRealiza)

module.exports = router