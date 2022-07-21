const express = require('express')
const router = express.Router()
const RecargaController = require('../controllers/recargaController')

router.post('/recarga', RecargaController.createRecarga)

module.exports = router