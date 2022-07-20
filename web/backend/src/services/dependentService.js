const DbConnection = require('../database/connection')
const ContaService = require('../services/contaService')

class DependentService{
    async insertDependent(dependentReceived){
        try {
            const database = await DbConnection();
            const titularId = dependentReceived.titularId;
            const insertQuery = 'INSERT INTO Dependente (dependente_id,dependente_titular_id,dependente_num_cartao,dependente_cod_conta)'+
            ' VALUES (?,?,?,?)';
            const valuesQuery = [dependentReceived.id,titularId,dependentReceived.num_cartao,dependentReceived.codConta];
            await database.query(insertQuery,valuesQuery);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteDependent(id){
        try {
            const database = await DbConnection();
            await database.query('DELETE FROM Dependente WHERE dependente_id=?;', id);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getCodConta(id){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select dependente_cod_conta from Dependente where dependente_id = ?',id);
            if(result.length > 0){
                return result[0].dependente_cod_conta;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }   

    async getAllDependentId(){
        try {
            const database = await DbConnection();
            const selectQuery = 'SELECT dependente_id from Dependente;';
            const [ids] = await database.query(selectQuery);
            return ids;
        } catch (error) {
            return error;
        }
    }

    async getDependenteByIdTitular(idTitular){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select * from Dependente where dependente_titular_id = ?',idTitular)
            if(result.length > 0){
                return result[0];
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getCodContaByNumCartao(num_cartao){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select dependente_cod_conta from Dependente where dependente_num_cartao = ?',num_cartao)
            if(result.length > 0){
                console.log(result[0]);
                return result[0];
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async isDependente(id){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select * from dependente where dependente_id = ?',id);
            if(result.length > 0){
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async hasDependente(id){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select * from dependente where dependente_titular_id = ?',id);
            if(result.length > 0){
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new DependentService();