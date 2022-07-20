const DbConnection = require('../database/connection')

class TitularService{
    async insertTitular(titularReceived){
        try {
            const database = await DbConnection();
            const insertQuery = 'INSERT INTO Titular (titular_id,titular_cod_conta) VALUES (?,?)';
            const valuesQuery = [titularReceived.id,titularReceived.titular_cod_conta];
            await database.query(insertQuery, valuesQuery);
        } catch (error) {
            return error;
        }
    }

    async getTitularById(id){
        try {
            const database = await DbConnection();
            const [titulares] = await database.query('SELECT * FROM Titular WHERE titular_id=?;', id);
            if (titulares.length > 0) {
                return titulares[0];
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getAllTitulares(){
        try {
            const database = await DbConnection();
            const [titulares] = await database.query('SELECT * FROM Titular;');
            return titulares;
        } catch (error) {
            return error;
        }
    }

    async deleteTitular(id){
        try {
            const database = await DbConnection();
            await database.query('DELETE FROM Titular WHERE titular_id=?;', id);
        } catch (error) {
            return error;
        }
    }

    async updateTitular(id, titularReceived){
        try {
            const database = await DbConnection();
            const updateQuery = 'UPDATE Titular SET titular_cod_conta=? WHERE titular_id=?;';
            const values = [titularReceived.titular_cod_conta, id];
            await database.query(updateQuery, values);
        } catch (error) {
            return error;
        }
    }

    async getAllTitularId(){
        try {
            const database = await DbConnection();
            const selectQuery = 'SELECT titular_id from Titular;';
            const [ids] = await database.query(selectQuery);
            return ids;
        } catch (error) {
            return error;
        }
    }

    async getCodConta(id){
        try {
            const database = await DbConnection();
            const [result] = await database.query('select titular_cod_conta from titular where titular_id = ?',id);
            if(result.length > 0){
                return result[0].titular_cod_conta;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new TitularService();