const TitularService = require('../../services/titularService')
const UserService = require('../../services/userService')
const ContaService = require('../../services/contaService')
const ContaTitularService = require('../../services/contaTitularService')
const CartaoService = require('../../services/cartaoService')
const CartaoCreditoService = require('../../services/cartaoCreditoService')
const CartaoDebitoService = require('../../services/cartaoDebitoService')
const dependentService = require('../../services/dependentService')
const dependentController = require('./dependentController')

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
            titularReceived.titular_cod_conta = accountCreatedId;

            //Criando a Conta Titular
            await ContaTitularService.insertContaTitular(accountCreatedId);

            //Inserindo Titular na Tabela
            await TitularService.insertTitular(titularReceived);

            //Criando um Cartao
            await CartaoService.insertCartao(titularReceived.id);
            const newCartao = await CartaoService.getCartaoByTitularId(titularReceived.id);

            //Criando um Cartao Crédito
            await CartaoCreditoService.insertCartaoCredito(newCartao.cartao_num_cartao);

            //Criando um Cartao Débito
            await CartaoDebitoService.insertCartaoDebito(newCartao.cartao_num_cartao);

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
            const titularReceived = request.body
            UserService.updateUser(id,titularReceived);
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

    async show_titulares(request, response){
        try {
            const titulares = await TitularService.getAllTitularId()
            const usersByTitularId = await UserService.getAllUsersByTitularId(titulares);
            return response.status(200).json(usersByTitularId)
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

    async show_titular(request, response){
        try {
            const { id } = request.params;
            const titular = await UserService.getUserById(id);
            return response.status(200).json(titular);
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

    async delete_titular(request,response){
        try {
            const {id} = request.params;
            const dependente = await dependentService.getDependenteByIdTitular(id);
            const titular = await TitularService.getTitularById(id);
            UserService.deleteUser(dependente.dependente_id);
            UserService.deleteUser(id);
            ContaService.deleteConta(titular.titular_cod_conta);
            ContaService.deleteConta(dependente.dependente_cod_conta);
            return response.status(200).json({
                msg: "Titular removido com sucesso"
            }) 
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }
}

module.exports = new TitularController();