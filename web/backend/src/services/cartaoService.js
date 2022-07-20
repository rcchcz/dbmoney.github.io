const DbConnection = require('../database/connection')

class CartaoService{
    async insertCartao(idTitular){
        try {
            const database = await DbConnection();
            const randomCVC = Math.floor(100 + Math.random() * 900);
            let cartao_validade = ''+((new Date().getFullYear())+5)+'-'+new Date().getMonth()+'-'+new Date().getDay();
            const cartao_status = "valido";
            let disponivel = false;
            let num_cartao = 0;
            while(disponivel == false){
                num_cartao = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
                let [numCards] = await database.query('select cartao_num_cartao from Cartao where cartao_num_cartao = ?',num_cartao);
                if(numCards.length == 0){
                    disponivel = true;
                }
            }
            const values = [num_cartao,randomCVC,cartao_validade,cartao_status,idTitular]; 
            const result = await database.query('insert into Cartao (cartao_num_cartao,cartao_cvc,cartao_validade,cartao_status,cartao_id_titular)'+
            ' values (?,?,?,?,?)',values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteCartao(num_cartao){
        try {
            const database = await DbConnection();
            await database.query('DELETE FROM Cartao where cartao_num_cartao = ?',num_cartao);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getCartaoByNumCartao(num_cartao){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select * from Cartao where cartao_num_cartao = ?',num_cartao);
            if(result.length > 0){
                let date = result[0].cartao_validade;
                result[0].cartao_validade = date.getFullYear().toString().substring(2,4) + '/' + ("0"+(date.getMonth()+1)).slice(-2);
                return result[0];
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getCartaoByTitularId(id){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select * from Cartao where cartao_id_titular = ? and cartao_num_cartao not in(select cartaocredito_num_cartao from CartaoCredito)',id);
            if(result.length > 0){
                let date = result[0].cartao_validade;
                result[0].cartao_validade = date.getFullYear().toString().substring(2,4) + '/' + ("0"+(date.getMonth()+1)).slice(-2);
                return result[0];
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getCartaoByTitularId2(id){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select * from Cartao where cartao_id_titular = ? and cartao_num_cartao in(select cartaocredito_num_cartao from cartaocredito)',id);
            if(result.length > 0){
                let date = result[0].cartao_validade;
                result[0].cartao_validade = date.getFullYear().toString().substring(2,4) + '/' + ("0"+(date.getMonth()+1)).slice(-2);
                return result[0];
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new CartaoService();
