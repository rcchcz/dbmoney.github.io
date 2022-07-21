const RealizaService = require('../../services/realizaService')

class RealizaController {

    async createRealiza(request,response){
        try {
            const realizaReceived = request.body
            await RealizaService.insertRealiza(realizaReceived);
            return response.status(200).json({
                msg: 'Realiza adicionada com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

}

module.exports = new RealizaController() 
