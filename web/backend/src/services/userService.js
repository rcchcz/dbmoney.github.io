const Bcrypt = require('../utils/bcrypt')

class UserService {
    async insertUser(userReceived) {
        const passwordEncrypted = await Bcrypt.hashingPassword(userReceived.password)
        const newUser = {
            name: userReceived.name,
            cpf: userReceived.cpf,
            password: passwordEncrypted
        }
        console.log('Usuário inserido com sucesso!')
        // web: montar json
        // bd: inserir na tabela  
    }
    async getAllUsers() {
        console.log('Usuários')
        return 'Usuários'
        // web: return <json>
        // bd: return <resultado da consulta>
    }
    async getUserById(id) {
        console.log('Usuário')
        return 'Usuário'
        // web: return <json>
        // bd: return <resultado da consulta>
    }
    async updateUser(id, userReceived) {
        const userUpdated = {
            ...userReceived
        }
        console.log('Atualizado com sucesso!')
        // web: atualizar json
        // bd: atuaizar na tabela  
    }
    async changePassword(newPassword, id) {
        const passwordEncrypted = await Bcrypt.hashingPassword(newPassword)
        // atualizar pela nova senha
        console.log('Senha alterada com sucesso!')
    }
    async deleteUser(id) {
        console.log('Apagado com sucesso!')
        // web: apagar json
        // bd: apagar na tabela  
    }
    async validateCredentials(cpf, password) {
        // const userFound = <verficar a existência do cpf no json/tabela>
        const userFound = [{cpf: '123.456.789-00'}]
        var credentialsStatus = { status: false, err: 'Não validado...' }

        if (userFound.length > 0) {
            if (await Bcrypt.comparePassword(password, userFound.password))
                credentialsStatus = { status: true, msg: 'Credenciais válidas!', id: userFound.id }
        } else {
            credentialsStatus = { status: false, err: 'Usuário e/ou senha incorretos!' }
        }

        console.log(credentialsStatus)
        return credentialsStatus
    }
}

module.exports = new UserService();