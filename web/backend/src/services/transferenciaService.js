const DbConnection = require('../database/connection')

class TransferenciaService{
    async insertTransferencia(idTransacao){
        try {
            const database = await DbConnection();
            await database.query('insert into Transferencia (transferencia_id_transacao) values (?)',idTransacao);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new TransferenciaService();
