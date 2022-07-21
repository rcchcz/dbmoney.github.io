const CompoeService = require('../../services/compoeService')

class CompoeController {

    async createCompoe(request,response){
        try {
            const idOperacao = request.params.idOperacao;
            const idExtrato = request.params.idExtrato;
            CompoeService.insertCompoe(idOperacao,idExtrato);
            return response.status(200).json({
                msg: 'Compoe adicionado com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

}

module.exports = new CompoeController() 
