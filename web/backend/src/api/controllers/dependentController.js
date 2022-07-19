const DependentService = require('../../services/dependentService')
const UserService = require('../../services/userService')
const UserController = require('../../api/controllers/userController')
const ContaDependenteService = require('../../services/contaDependenteService')
const ContaService = require('../../services/contaService');

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
            await ContaDependenteService.insertContaDependente();

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
            await DependentService.deleteDependent(id);
            await UserService.deleteUser(id);
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
        await UserController.update_user(request,response);
    }
}

module.exports = new DependentController();