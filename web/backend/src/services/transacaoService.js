const DbConnection = require('../database/connection')

class TransacaoService{
    async insertTransacao(transacaoReceived){
        try {
            const database = await DbConnection();
            const insertQuery = 'insert into Transacao (transacao_operacao_id,transacao_conta,transacao_banco,transacao_agencia,transacao_tipo)'
            +' values (?,?,?,?,?)';
            const values = [transacaoReceived.operacao_id,transacaoReceived.conta,1,1,0];
            await database.query(insertQuery,values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new TransacaoService();
