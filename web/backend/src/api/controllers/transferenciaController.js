const TransferenciaService = require('../../services/transferenciaService')

class TransferenciaController {

    async createTransferencia(request,response){
        try {
            const id = request.params.id;
            TransferenciaService.insertTransferencia(id);
            return response.status(200).json({
                msg: 'Transferência adicionada com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

}

module.exports = new TransferenciaController() 
