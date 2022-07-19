const UserService = require('../../services/userService')

class UserController {
    async create_user(request, response) {
        const userReceived = request.body
        try {
            await UserService.insertUser(userReceived)
            response.status(200).json({
                msg: "Usuário inserido com sucesso"
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async show_users(request, response) {
        try {
            const users = await UserService.getAllUsers()
            return response.status(200).json(users)
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async show_user(request, response) {
        const { id } = request.params
        try {
            const user = await UserService.getUserById(id)
            return response.status(200).json(user)
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async update_user(request, response) {
        const { id } = request.params
        const userReceived = {
            ...request.body
        }
        try {
            await UserService.updateUser(id, userReceived)
            return response.status(200).json({
                msg: "Usuário alterado com sucesso"
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async delete_user(request, response) {
        const { id } = request.params
        try {
            await UserService.deleteUser(id)
            return response.status(200).json({
                msg: 'Usuário deletado com sucesso'
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async change_password(request, response) {
        var newPassword = request.body.newPassword

        try {
            await UserService.changePassword(newPassword, isTokenValid.token.user_id, isTokenValid.token.token)
            response.status(200).json({ msg: 'Senha alterada!' })

        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async login(request, response) {
        const { cpf, senha } = request.body
        var credentialStatus = await UserService.validateCredentials(cpf, senha)

        if (credentialStatus.status) {
            return response.status(200).json({
                msg: credentialStatus.msg,
                id: credentialStatus.id
            })
        } else {
            return response.status(401).json({
                err: credentialStatus.err
            })
        }

    }
}

module.exports = new UserController()