const express = require('express')
const router = express.Router()
const CompoeController = require('../controllers/compoeController')

router.post('/compoe/:idOperacao/:idExtrato', CompoeController.createCompoe)

module.exports = router