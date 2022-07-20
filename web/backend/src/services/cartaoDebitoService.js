const DbConnection = require('../database/connection')

class CartaoDebitoService{

    async insertCartaoDebito(num_cartao){
        try {
            const database = await DbConnection();
            await database.query('insert into cartaodebito (cartaodebito_num_cartao) value (?)',num_cartao);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getCartaoDebitoByNumCartao(num_cartao){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select * from cartaodebito where cartaodebito_num_cartao = ?',num_cartao)
            if(result.length > 0){
                return result[0];
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new CartaoDebitoService();
