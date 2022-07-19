const Bcrypt = require('../utils/bcrypt')
const DbConnection = require('../database/connection')

class UserService {
    async insertUser(userReceived) {
        try {
            const database = await DbConnection()
            const passwordEncrypted = await Bcrypt.hashingPassword(userReceived.cliente_senha)
            const insertQuery = 'INSERT INTO Cliente (cliente_nome, cliente_telefone, ' +
                'cliente_cpf, cliente_endereco, cliente_data_nascimento, ' +
                'cliente_senha, cliente_id_gerente) VALUES (?,?,?,?,?,?,?);'
            const values = [userReceived.cliente_nome, userReceived.cliente_telefone, userReceived.cliente_cpf, 
                userReceived.cliente_endereco, userReceived.cliente_data_nascimento, 
                passwordEncrypted, 3]
            await database.query(insertQuery, values);
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async getAllUsers() {
        try {
            const database = await DbConnection()
            const [usuarios] = await database.query('SELECT * FROM Cliente;')
            return usuarios
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async getUserById(id) {
        try {
            const database = await DbConnection()
            const [usuarios] = await database.query('SELECT * FROM Cliente WHERE cliente_id=?;', id)
            if (usuarios.length > 0) {
                return usuarios[0]
            }
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async updateUser(id, userReceived) {
        try {
            const database = await DbConnection();
            const updateQuery = 'UPDATE Cliente SET cliente_nome=?, cliente_telefone=?, ' +
                'cliente_cpf=?, cliente_endereco=?, cliente_data_nascimento=?, ' +
                'cliente_senha=?, cliente_id_gerente=? WHERE cliente_id=?;';
            const values = [userReceived.nome, userReceived.telefone, userReceived.cpf, 
                userReceived.endereco, userReceived.data_nascimento, 
                userReceived.senha, 3, id];
            await database.query(updateQuery, values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async changePassword(newPassword, id) {
        const passwordEncrypted = await Bcrypt.hashingPassword(newPassword);
        try {
            const database = await DbConnection();
            const updateQuery = 'UPDATE Cliente SET cliente_senha=? WHERE cliente_id=?;';
            const values = [passwordEncrypted, id];
            await database.query(updateQuery, values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async deleteUser(id) {
        try {
            const database = await DbConnection();
            await database.query('DELETE FROM Cliente WHERE cliente_id=?;', id);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async validateCredentials(cpf, senha) {
        try {
            const database = await DbConnection();
            const [userFound] = await database.query('SELECT * FROM Cliente WHERE cliente_cpf=?;', cpf);
            var credentialsStatus = { status: false, err: 'Não validado...' };
            
            if (userFound.length > 0) {
                if (await Bcrypt.comparePassword(senha, userFound[0].cliente_senha))
                    return credentialsStatus = { status: true, msg: 'Credenciais válidas!', id: userFound.cliente_id };
            } 
            
            return credentialsStatus = { status: false, err: 'Usuário e/ou senha incorretos!' };
        } catch (err) {
            return err;
        }
    }
    async getUserIdByCPF(cpf){
        try {
            const database = await DbConnection();
            const [userFound] = await database.query('SELECT * FROM Cliente WHERE cliente_cpf=?;',cpf);
            console.log("Quantidade Result Returned -> " + userFound.length);
            console.log(cpf);
            return userFound[0].cliente_id;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new UserService();