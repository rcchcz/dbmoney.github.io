const express = require('express')
const router = express.Router()
const PixController = require('../controllers/pixController')

router.post('/pix/:id', PixController.createPix)

module.exports = router