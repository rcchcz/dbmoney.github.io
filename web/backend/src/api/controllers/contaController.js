const ContaService = require('../../services/contaService')
const DependentService = require('../../services/dependentService')
const TitularService = require('../../services/titularService')

class ContaController {
    async create_conta(request, response) {
        const contaReceived = request.body
        try {
            await ContaService.insertConta(contaReceived)
            response.status(200).json({
                msg: "Conta criada com sucesso"
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async show_contas(request, response) {
        try {
            const contas = await ContaService.getAllContas()
            return response.status(200).json(contas)
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async show_conta(request, response) {
        const { codigo } = request.params
        try {
            const conta = await ContaService.getContaByCodigo(codigo)
            return response.status(200).json(conta)
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async update_conta(request, response) {
        const { codigo } = request.params
        const contaReceived = {
            ...request.body
        }
        try {
            await ContaService.updateConta(codigo, contaReceived)
            return response.status(200).json({
                msg: "Conta alterada com sucesso"
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async delete_conta(request, response) {
        const { codigo } = request.params
        try {
            await ContaService.deleteConta(codigo)
            return response.status(200).json({
                msg: 'Conta deletada com sucesso'
            })
        } catch (err) {
            return response.status(400).json({
                error: err
            })
        }
    }
    async addSaldoByBoleto(request,response){
        try {
            
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async addSaldo(request,response){
        try {
            const codigo = request.params.codigo;
            const valor = request.params.valor;  
            ContaService.addSaldo(codigo,valor);
            return response.status(200).json({
                msg: 'Saldo adicionado com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

    async removeSaldo(request,response){
        try {
            const codigo = request.params.codigo;
            const valor = request.params.valor;  
            ContaService.removeSaldo(codigo,valor);
            return response.status(200).json({
                msg: 'Saldo descontado com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

    async getSaldo(request,response){
        try {
            const id = request.params.id;
            if(await DependentService.isDependente(id) == true){
                const codConta = await DependentService.getCodConta(id);
                const saldo = await ContaService.getSaldo(codConta);
                return response.status(200).json(saldo)
            }else if(await DependentService.isDependente(id) == false){
                console.log("Teste 03");
                const codConta = await TitularService.getCodConta(id);
                const saldo = await ContaService.getSaldo(codConta);
                return response.status(200).json(saldo)
            }
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }
}

module.exports = new ContaController() 