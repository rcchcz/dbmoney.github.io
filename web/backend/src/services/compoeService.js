const DbConnection = require('../database/connection')

class CompoeService{
    async insertCompoe(idOperacao,idExtrato){
        try {
            const database = await DbConnection();
            const values = [idOperacao,idExtrato];
            await database.query('insert into Compoe (compoe_id_operacao,compoe_id_extrato) values (?,?)',values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new CompoeService();
