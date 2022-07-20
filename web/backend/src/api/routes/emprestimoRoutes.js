const express = require('express')
const router = express.Router()
const EmprestimoController = require('../controllers/emprestimoController')

router.get('/emprestimo', EmprestimoController.solicitarEmprestimo)
router.post('/emprestimo', EmprestimoController.showEmprestimos)

module.exports = router