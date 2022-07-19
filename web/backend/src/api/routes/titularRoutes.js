const express = require('express')
const router = express.Router()
const TitularController = require('../controllers/titularController')

router.post('/titular', TitularController.create_Titular)
router.put('/titular/:id', TitularController.update_Titular)

module.exports = router