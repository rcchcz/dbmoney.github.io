const express = require('express')
const router = express.Router()
const DependentController = require('../controllers/dependentController')

router.post('/dependente', DependentController.create_Dependent)
router.delete('/dependente/:id',DependentController.delete_dependent);
router.put('/dependente/:id', DependentController.update_dependent)
router.get('/dependente/:id', DependentController.show_dependent)
router.get('/dependente', DependentController.show_dependents)


module.exports = router