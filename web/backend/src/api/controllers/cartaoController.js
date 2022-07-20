const CartaoService = require('../../services/cartaoService')

class CartaoController {

    async create_cartao(request,response){
        try {
            const {id} = request.params
            CartaoService.insertCartao(id);
            response.status(200).json({
                msg: "Cartao criado com sucesso"
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

    async delete_cartao(request,response){
        try {
            const {num_cartao} = request.params
            CartaoService.deleteCartao(num_cartao);
            response.status(200).json({
                msg: "Cartao deletado com sucesso"
            })
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

    async show_cartao(request,response){
        const { num_cartao } = request.params
        try {
            const cartao = await CartaoService.getCartaoByNumCartao(num_cartao)
            return response.status(200).json(cartao)
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }
}

module.exports = new CartaoController() 