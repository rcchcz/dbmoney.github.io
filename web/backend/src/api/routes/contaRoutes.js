const express = require('express')
const router = express.Router()
const ContaController = require('../controllers/contaController')

router.post('/conta', ContaController.create_conta)
router.get('/conta', ContaController.show_contas)
router.get('/conta/:codigo', ContaController.show_conta)
router.put('/conta/:codigo', ContaController.update_conta)
router.delete('/conta/:codigo', ContaController.delete_conta)

module.exports = router