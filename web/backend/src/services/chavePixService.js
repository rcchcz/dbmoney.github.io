const DbConnection = require('../database/connection')
const ContaService = require('../services/contaService')
const UserService = require('../services/userService')
const DependenteService = require('../services/dependentService')
const TitularService = require('../services/titularService')

class ChavePixService{
    async insertChavePixCPF(cpf){
        try {
            const database = await DbConnection();
            const idUser = await UserService.getUserIdByCPF(cpf)
            let codConta ;
            if(await DependenteService.isDependente(idUser) == true){
                codConta = await DependenteService.getCodConta(idUser);
            }else if(await DependenteService.isDependente(idUser) == false){
                codConta = await TitularService.getCodConta(idUser);
            }
            const values = [cpf,codConta];
            await database.query('insert into ChavePix (chavepix_valor,chavepix_tipo,chavepix_conta_codigo)'
            +' values(?,0,?)',values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new ChavePixService();
