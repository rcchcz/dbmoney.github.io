const DbConnection = require('../database/connection')

class DependentService{
    async insertDependent(dependentReceived){
        try {
            const database = await DbConnection();
            const titularId = dependentReceived.titularId;
            const insertQuery = 'INSERT INTO Dependente (dependente_id,dependente_titular_id,dependente_num_cartao,dependente_cod_conta)'+
            ' VALUES (?,?,?,?)';
            const valuesQuery = [dependentReceived.id,titularId,37736758,159426];
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
}

module.exports = new DependentService();