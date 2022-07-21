const SaqueService = require('../../services/saqueService')

class SaqueController {

    async createSaque(request,response){
        try {
            const idOperacao = request.params.idOperacao
            const idTerminal = request.params.idTerminal
            await SaqueService.insertSaque(idOperacao,idTerminal)
            return response.status(200).json({
                msg: 'Saque adicionado com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

}

module.exports = new SaqueController() 
