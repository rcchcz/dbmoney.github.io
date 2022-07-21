const RecargaService = require('../../services/recargaService')

class RecargaController {

    async createRecarga(request,response){
        try {
            const recargaReceived = request.body
            await RecargaService.insertRecarga(recargaReceived);
            return response.status(200).json({
                msg: 'Recarga adicionada com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

}

module.exports = new RecargaController() 
