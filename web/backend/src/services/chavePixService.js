const DbConnection = require('../database/connection')
const ContaService = require('../services/contaService')
const UserService = require('../services/userService')
const DependenteService = require('../services/dependentService')
const TitularService = require('../services/titularService')

class ChavePixService{
    async insertChavePixCPF(cpf){
        try {
            console.log("TESTE01");
            const database = await DbConnection();
            console.log("TESTE02");
            const idUser = await UserService.getUserIdByCPF(cpf)
            console.log("TESTE03");
            let codConta ;
            console.log("TESTE04");
            if(await DependenteService.isDependente(idUser) == true){
                codConta = await DependenteService.getCodConta(idUser);
            }else if(await DependenteService.isDependente(idUser) == false){
                codConta = await TitularService.getCodConta(idUser);
            }
            console.log("TESTE05");
            const values = [cpf,codConta];
            console.log("TESTE06");
            await database.query('insert into ChavePix (chavepix_valor,chavepix_tipo,chavepix_conta_codigo)'
            +' values(?,0,?)',values);
            console.log("TESTE07");
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new ChavePixService();
