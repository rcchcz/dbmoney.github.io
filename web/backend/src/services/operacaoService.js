const DbConnection = require('../database/connection')

class OperacaoService{
    async insertOperacao(operacaoReceived){
        try {
            const database = await DbConnection();
            const values = [operacaoReceived.codigo,operacaoReceived.data,operacaoReceived.valor];
            await database.query('insert into Operacao (operacao_codigo,operacao_data,operacao_valor) values (?,?,?)',values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new OperacaoService();
