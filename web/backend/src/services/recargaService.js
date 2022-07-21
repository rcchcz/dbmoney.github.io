const DbConnection = require('../database/connection')

class RecargaService{
    async insertRecarga(recargaReceived){
        try {
            const database = await DbConnection();
            const values = [recargaReceived.operacao_id,recargaReceived.operadora,recargaReceived.num_telefone];
            await database.query('insert into Recarga (recarga_operacao_id,recarga_operadora,recarga_num_telefone)'
            +' values (?,?,?)',values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new RecargaService();
