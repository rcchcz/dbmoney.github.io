const DbConnection = require('../database/connection')

class ContaTitularService {
    async insertContaTitular(codigo) {
        try {
            const database = await DbConnection();
            const insertQuery = 'INSERT INTO Contatitular (contatitular_codigo) values (?)';
            const value = codigo;
            await database.query(insertQuery, value);
            console.log("Conta Titular Criada com Sucesso");
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async getAllContaTitular() {
        try {
            const database = await DbConnection();
            const [contas] = await database.query('SELECT * FROM Contatitular;');
            return contas;
        } catch (error) {
            return error;
        }
    }
    async getContaTitularByCodigo(codigo) {
        try {
            const database = await DbConnection();
            const [contas] = await database.query('SELECT * FROM Contatitular WHERE contatitular_codigo=?;', codigo);
            if (contas.length > 0) {
                return contas[0];
            }
        } catch (error) {
            return error;
        }
    }

    async deleteConta(codigo) {
        try {
            const database = await DbConnection();
            await database.query('DELETE FROM Contatitular WHERE contatitular_codigo=?;', codigo);
        } catch (error) {
            return error;
        }
    }
}

module.exports = new ContaTitularService();