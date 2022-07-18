const DbConnection = require('../database/connection')

class ContaService {
    async insertConta(contaReceived) {
        try {
            const database = await DbConnection();
            const insertQuery = 'INSERT INTO Conta (conta_codigo, conta_tipo, conta_saldo, conta_codigo_agencia) ' +
                'VALUES (?,?,?,?);';
            let saldo = 0.0;
            let codigoAgencia = 1;
            const values = [contaReceived.conta_codigo, contaReceived.conta_tipo, saldo, codigoAgencia];
            await database.query(insertQuery, values);
        } catch (err) {
            return err;
        }
    }
    async getAllContas() {
        try {
            const database = await DbConnection();
            const [contas] = await database.query('SELECT * FROM Conta;');
            return contas;
        } catch (err) {
            return err;
        }
    }
    async getContaByCodigo(codigo) {
        try {
            const database = await DbConnection();
            const [contas] = await database.query('SELECT * FROM Conta WHERE conta_codigo=?;', codigo);
            if (contas.length > 0) {
                return contas[0];
            }
        } catch (err) {
            return err;
        }
    }
    async updateConta(codigo, contaReceived) {
        try {
            const database = await DbConnection();
            const updateQuery = 'UPDATE Conta SET conta_saldo=? WHERE conta_codigo=?;';
            const values = [contaReceived.conta_saldo, codigo];
            await database.query(updateQuery, values);
        } catch (err) {
            return err;
        }
    }
    async deleteConta(codigo) {
        try {
            const database = await DbConnection();
            await database.query('DELETE FROM Conta WHERE conta_codigo=?;', codigo);
        } catch (err) {
            return err;
        }
    }
}

module.exports = new ContaService();