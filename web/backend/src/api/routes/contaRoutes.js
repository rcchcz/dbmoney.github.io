const express = require('express')
const router = express.Router()
const ContaController = require('../controllers/contaController')

router.post('/conta', ContaController.create_conta)
router.get('/conta', ContaController.show_contas)
router.get('/conta/:codigo', ContaController.show_conta)
router.put('/conta/:codigo', ContaController.update_conta)
router.delete('/conta/:codigo', ContaController.delete_conta)
router.post('/conta/:id', ContaController.getSaldo)

//ROTAS PARA TESTE
router.get('/conta/:codigo/:valor',ContaController.addSaldo)
router.post('/conta/:codigo/:valor',ContaController.removeSaldo)

module.exports = router