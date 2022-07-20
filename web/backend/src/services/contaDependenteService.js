const DbConnection = require('../database/connection')

class contaDependenteService{
    async insertContaDependente(codigo){
        try {
            const database = await DbConnection();
            await database.query('INSERT INTO ContaDependente (contadependente_codigo) value (?)',codigo);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getAllContaDependente() {
        try {
            const database = await DbConnection();
            const [contas] = await database.query('SELECT * FROM ContaDependente;');
            return contas;
        } catch (error) {
            return error;
        }
    }
    async getContaDependenteByCodigo(codigo) {
        try {
            const database = await DbConnection();
            const [contas] = await database.query('SELECT * FROM ContaDependente WHERE contadependente_codigo=?;', codigo);
            if (contas.length > 0) {
                return contas[0];
            }
        } catch (error) {
            return error;
        }
    }

    async deleteContaDependente(codigo) {
        try {
            const database = await DbConnection();
            await database.query('DELETE FROM ContaDependente WHERE contadependente_codigo=?;', codigo);
        } catch (error) {
            return error;
        }
    }
}

module.exports = new contaDependenteService();