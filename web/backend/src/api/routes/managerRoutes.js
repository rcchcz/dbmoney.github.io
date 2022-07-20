const express = require('express')
const router = express.Router()
const ManagerController = require('../controllers/managerController')

router.post('/manager', ManagerController.create_manager)
router.get('/manager', ManagerController.show_managers)
router.get('/manager/:id', ManagerController.show_manager)
router.put('/manager/:id', ManagerController.update_manager)
router.delete('/manager/:id', ManagerController.delete_manager)

module.exports = router