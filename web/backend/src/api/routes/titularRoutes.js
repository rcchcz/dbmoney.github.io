const express = require('express')
const router = express.Router()
const TitularController = require('../controllers/titularController')

router.post('/titular', TitularController.create_Titular)
router.put('/titular/:id', TitularController.update_Titular)
router.get('/titular/:id', TitularController.show_titular)
router.get('/titular', TitularController.show_titulares)
router.delete('/titular/:id', TitularController.delete_titular)

module.exports = router