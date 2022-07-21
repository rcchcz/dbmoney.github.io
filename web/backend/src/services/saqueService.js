const DbConnection = require('../database/connection')

class SaqueService{
    async insertSaque(idOperacao,idTerminal){
        try {
            const database = await DbConnection();
            const values = [idOperacao,idTerminal];
            await database.query('insert into Saque (saque_operacao_id,saque_id_terminal) values (?,?)',values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new SaqueService();
