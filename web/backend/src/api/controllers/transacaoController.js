const TransacaoService = require('../../services/transacaoService')

class TransacaoController {

    async createTransacao(request,response){
        try {
            const transacaoReceived = request.body;
            TransacaoService.insertTransacao(transacaoReceived);
            return response.status(200).json({
                msg: 'Transação adicionada com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

}

module.exports = new TransacaoController() 
