const DbConnection = require('../database/connection')

class ContaService {
    async insertConta() {
        try {
            const database = await DbConnection();
            const insertQuery = 'INSERT INTO Conta (conta_tipo, conta_saldo, conta_codigo_agencia) ' +
                'VALUES (?,?,?);';
            let saldo = 0.0;
            let codigoAgencia = 1;
            let tipo = 0;
             /*Nessa parte Inicial Somente um Tipo de Conta*/
            const values = [tipo, saldo, codigoAgencia];
            let insertedId;
            const result = await database.query(insertQuery, values);
            console.log(result);
            return result[0].insertId;
        } catch (error) {
            console.log(error);
            return error;
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
            console.log("DELETADA!!!");
        } catch (error) {
            console.log(error)
            return err;
        }
    }
    async addSaldo(contaCodigo,valor){
        try {
            const database = await DbConnection();
            const values = [valor,contaCodigo];
            await database.query('UPDATE Conta SET conta_saldo = conta_saldo + ? where conta_codigo = ?',values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async removeSaldo(contaCodigo,valor){
        try {
            if(valor >= 0){
                const database = await DbConnection();
                //await database.query('SELECT conta_saldo from conta where conta_codigo = ?',contaCodigo)
                const [result] = await database.query('SELECT conta_saldo from Conta where conta_codigo = ?',contaCodigo);
                if(result.length > 0){
                    if (result[0].conta_saldo < valor){
                        throw "Saldo Insuficiente";
                    }
                }
                const values = [valor,contaCodigo];
                await database.query('UPDATE Conta SET conta_saldo = conta_saldo - ? where conta_codigo = ?',values);
            }
        } catch (error) {
            return error;
        }
    }
    async getSaldo(codConta){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select conta_saldo from conta where conta_codigo = ?',codConta);
            if(result.length > 0){
                return result[0].conta_saldo;
            }else{
                throw "Conta não encontrada";
            }
        } catch (error) {
            return error;
        }
    }

    async getContaById(id){
        try {
            const database = await DbConnection();

        } catch (error) {
            return error;
        }
    }
}

module.exports = new ContaService();