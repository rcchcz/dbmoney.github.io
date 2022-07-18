const ContaService = require('../../services/contaService')

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
}

module.exports = new ContaController() 