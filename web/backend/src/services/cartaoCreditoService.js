const DbConnection = require('../database/connection')

class CartaoCreditoService{

    async insertCartaoCredito(num_cartao){
        try {
            const database = await DbConnection();
            const values = [num_cartao,1000];
            await database.query('insert into cartaocredito (cartaocredito_num_cartao,cartaocredito_limite)'
            +' values (?,?)',values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getCartaoCreditoByNumCartao(num_cartao){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select * from cartaocredito where cartaocredito_num_cartao = ?',num_cartao)
            if(result.length > 0){
                return result[0];
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async increaseLimite(num_cartao){
        try {
            const database = await DbConnection();
            await database.query('update cartaocredito set cartaocredito_limite = cartaocredito_limite + 500 where cartaocredito_num_cartao = ?',num_cartao);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new CartaoCreditoService();