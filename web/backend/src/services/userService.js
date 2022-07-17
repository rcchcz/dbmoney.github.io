const Bcrypt = require('../utils/bcrypt')
const DbConnection = require('../database/connection')

class UserService {
    async insertUser(userReceived) {
        try {
            const database = await DbConnection()
            const passwordEncrypted = await Bcrypt.hashingPassword(userReceived.senha)
            const sql = 'INSERT INTO Cliente (cliente_nome, cliente_telefone, ' +
                'cliente_cpf, cliente_endereco, cliente_data_nascimento, ' +
                'cliente_senha, cliente_id_gerente) VALUES (?,?,?,?,?,?,?);'
            const values = [userReceived.nome, userReceived.telefone, userReceived.cpf, 
                userReceived.endereco, userReceived.data_nascimento, 
                passwordEncrypted, 1]
            console.log(values + ' ' + sql)
            await database.query(sql, values)
        } catch (err) {
            return err
        }
    }
    async getAllUsers() {
        try {
            const database = await DbConnection()
            const [usuarios] = await database.query('SELECT * FROM Cliente;')
            return usuarios
        } catch (err) {
            return err
        }
    }
    async getUserById(id) {
        try {
            const database = await DbConnection()
            const [usuarios] = await database.query('SELECT * FROM Cliente WHERE cliente_id=?;', id)
            if (usuarios.length > 0) {
                return usuarios[0]
            }
        } catch (err) {
            return err
        }
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