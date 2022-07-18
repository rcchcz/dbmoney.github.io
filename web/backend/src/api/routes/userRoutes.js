const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/user', UserController.create_user)
router.get('/user', UserController.show_users)
router.get('/user/:id', UserController.show_user)
router.put('/user/:id', UserController.update_user)
router.delete('/user/:id', UserController.delete_user)
router.post('/login', UserController.login)
router.put('/changepassword/:id', UserController.change_password)

module.exports = router