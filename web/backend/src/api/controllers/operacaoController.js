const OperacaoService = require('../../services/operacaoService')

class OperacaoController {

    async createOperacao(request,response){
        try {
            const operacaoReceived = request.body
            await OperacaoService.insertOperacao(operacaoReceived);
            return response.status(200).json({
                msg: 'Operacao adicionada com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

}

module.exports = new OperacaoController() 
