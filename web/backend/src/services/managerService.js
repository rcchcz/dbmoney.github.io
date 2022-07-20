const DbConnection = require('../database/connection')

class ManagerService{

    async insertManager(managerReceived){
        try {
            const database = await DbConnection();
            const insertQuery = 'INSERT INTO Gerente (gerente_nome) VALUES (?);';
            const values = managerReceived.nome;
            await database.query(insertQuery,values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getAllManagers(){
        try {
            const database = await DbConnection();
            const [gerentes] = await database.query('SELECT * FROM Gerente;')
            return gerentes;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getManagerById(id){
        try {
            const database = await DbConnection();
            const [gerentes] = await database.query('SELECT * FROM Gerente WHERE gerente_id=?;', id);
            if (gerentes.length > 0) {
                return gerentes[0];
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async deleteManager(id){
        try {
            const database = await DbConnection();
            await database.query('DELETE FROM Gerente WHERE gerente_id=?;',id)
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async updateManager(id,newName){
        try {
            const database = await DbConnection();
            const query = 'UPDATE Gerente SET gerente_nome=? WHERE gerente_id=?;';
            const values = [newName,id];
            const queryUpdate = await database.query(query,values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new ManagerService();