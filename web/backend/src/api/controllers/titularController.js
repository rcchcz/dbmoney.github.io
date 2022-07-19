const TitularService = require('../../services/titularService')
const UserService = require('../../services/userService')
const ContaService = require('../../services/contaService')
const ContaTitularService = require('../../services/contaTitularService')

class TitularController {
    async create_Titular(request, response) {
        try {
            const titularReceived = request.body;

            //Criando o Cliente
            await UserService.insertUser(titularReceived);
            const userCreatedId = await UserService.getUserIdByCPF(titularReceived.cliente_cpf);
            titularReceived.id = userCreatedId;

            //Criando a Conta do Cliente
            const accountCreatedId = await ContaService.insertConta();
            console.log("AccountCreatedId -> " + accountCreatedId);
            titularReceived.titular_cod_conta = accountCreatedId;

            //Criando a Conta Titular
            await ContaTitularService.insertContaTitular(accountCreatedId);

            //Inserindo Titular na Tabela
            await TitularService.insertTitular(titularReceived);

            response.status(200).json({
                msg: "Titular inserido com sucesso"
            })
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                error: error
            })
        }
    }

    async update_Titular(request,response){
        try {
            const { id } = request.params;
            const titularReceived = {
                ...request.body
            }
            UserService.updateUser(titularReceived);
            return response.status(200).json({
                msg: "Titular alterado com sucesso"
            })            
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                error: error
            })
        }
    }
}

module.exports = new TitularController();