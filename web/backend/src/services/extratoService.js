const DbConnection = require('../database/connection')

class ExtratoService{
    async insertExtrato(extratoReceived){
        try {
            const database = await DbConnection();
            const values = [extratoReceived.data_fim,extratoReceived.data_inicio,extratoReceived.id_cliente];
            await database.query('insert into Extrato (extrato_data_fim,extrato_data_inicio,extrato_id_cliente)'+
            ' values (?,?,?)',values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new ExtratoService();
