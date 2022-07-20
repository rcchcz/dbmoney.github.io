const CartaoCreditoService = require('../../services/cartaoCreditoService')
const CartaoService = require('../../services/cartaoService')

class CartaoCreditoController {
    async show_cartaoCredito(request,response){
        const { idTitular } = request.params
        try {
            const cartao = await CartaoService.getCartaoByTitularId(idTitular);
            const cartaoCredito = await CartaoCreditoService.getCartaoCreditoByNumCartao(cartao.cartao_num_cartao)
            return response.status(200).json(cartaoCredito)
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

    /*
    async increaseLimite(request,response){
        try {
            const {idTitular} = request.params
            const cartaoReceived = await CartaoService.getCartaoByTitularId2(idTitular)
            CartaoCreditoService.increaseLimite(cartaoReceived.cartao_num_cartao);
            return response.status(200).json({
                msg: 'Limite aumentado com sucesso'
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }
    */

    
    /*
    async addPurchase(request,response){
        const idTitular = request.params.idTitular
        const valor = request.params.valor
        try {
            return response.status(200).json({
                msg: ''
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }
    */
}

module.exports = new CartaoCreditoController() 
