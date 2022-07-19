const express = require('express')
const router = express.Router()
const DependentController = require('../controllers/dependentController')

router.post('/dependent', DependentController.create_Dependent)
router.delete('/dependent/:id',DependentController.delete_dependent);

module.exports = router