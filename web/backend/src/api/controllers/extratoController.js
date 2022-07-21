const ExtratoService = require('../../services/extratoService')

class ExtratoController {

    async createExtrato(request,response){
        try {
            const extratoReceived = request.body;
            await ExtratoService.insertExtrato(extratoReceived)
            return response.status(200).json({
                msg: 'Extrato adicionado com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

}

module.exports = new ExtratoController() 
