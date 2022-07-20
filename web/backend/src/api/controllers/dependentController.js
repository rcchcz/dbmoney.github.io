const DependentService = require('../../services/dependentService')
const UserService = require('../../services/userService')
const UserController = require('../../api/controllers/userController')
const ContaDependenteService = require('../../services/contaDependenteService')
const ContaService = require('../../services/contaService');
const CartaoService = require('../../services/cartaoService')
const CartaoCreditoService = require('../../services/cartaoCreditoService')
const CartaoDebitoService = require('../../services/cartaoDebitoService')

class DependentController {
    async create_Dependent(request, response) {
        try {
            const dependentReceived = request.body;
            
            //Criando o Cliente
            await UserService.insertUser(dependentReceived);
            const userCreatedId = await UserService.getUserIdByCPF(dependentReceived.cliente_cpf);
            dependentReceived.id = userCreatedId;

            
            //Criando a Conta Dependente
            const contaCodigo = await ContaService.insertConta();
            await ContaDependenteService.insertContaDependente(contaCodigo);
            dependentReceived.codConta = contaCodigo;

            //Criando um Cartao
            await CartaoService.insertCartao(dependentReceived.titularId);
            const newCartao = await CartaoService.getCartaoByTitularId(dependentReceived.titularId);

            //Criando um Cartao Debito
            await CartaoDebitoService.insertCartaoDebito(newCartao.cartao_num_cartao);
            dependentReceived.num_cartao = newCartao.cartao_num_cartao;

            //inserindo Dependente
            await DependentService.insertDependent(dependentReceived);
            response.status(200).json({
                msg: "Dependente inserido com sucesso"
            })
        } catch (err) {
            console.log(err);
            return response.status(400).json({
                error: err
            })
        }
    }

    async delete_dependent(request, response) {
        const { id } = request.params
        try {
            const CodConta = await DependentService.getCodConta(id);
            await DependentService.deleteDependent(id);
            await UserService.deleteUser(id);
            await ContaService.deleteConta(CodConta);
            //Lembrar de Apagar Cartão Tbm Quando Implementar
            return response.status(200).json({
                msg: 'Dependente deletado com sucesso'
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }

    async update_dependent(request, response) {
        try {
            const { id } = request.params;
            const dependenteReceived = request.body
            UserService.updateUser(id,dependenteReceived);
            return response.status(200).json({
                msg: "Dependente alterado com sucesso"
            })            
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                error: error
            })
        }
    }

    async show_dependent(request, response){
        try {
            const { id } = request.params;
            const dependent = await UserService.getUserById(id);
            return response.status(200).json(dependent);
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

    async show_dependents(request, response){
        try {
            const dependents = await DependentService.getAllDependentId()
            const usersByDependentId = await UserService.getAllUsersByDependentId(dependents);
            return response.status(200).json(usersByDependentId)
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }
}

module.exports = new DependentController();