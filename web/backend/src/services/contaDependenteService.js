const DbConnection = require('../database/connection')

class contaDependenteService{
    async insertContaDependente(contaDependentReceived){
        try {
            const database = await DbConnection();
            //await database.query(insertQuery,valuesQuery);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new contaDependenteService();