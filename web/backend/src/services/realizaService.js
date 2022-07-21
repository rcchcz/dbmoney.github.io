const DbConnection = require('../database/connection')

class RealizaService{
    async insertRealiza(realizaReceived){
        try {
            const database = await DbConnection();
            const values = [realizaReceived.id_operacao,realizaReceived.id_cliente];
            await database.query('insert into Realiza (realiza_id_operacao,realiza_id_cliente,realiza_cashback)'
            +' values (?,?,5)',values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new RealizaService();
