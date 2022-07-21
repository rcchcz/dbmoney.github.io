const DbConnection = require('../database/connection')

class PixService{
    async insertPix(idTransacao){
        try {
            const database = await DbConnection();
            await database.query('insert into Pix (pix_id_transacao) values (?)',idTransacao);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new PixService();
