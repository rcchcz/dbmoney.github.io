const PixService = require('../../services/pixService')

class PixController {

    async createPix(request,response){
        try {
            const id = request.params.id;
            PixService.insertPix(id);
            return response.status(200).json({
                msg: 'Pix adicionado com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

}

module.exports = new PixController() 
