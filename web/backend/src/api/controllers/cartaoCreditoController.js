const CartaoCreditoService = require('../../services/cartaoCreditoService')
const CartaoService = require('../../services/cartaoService')
const ContaService = require('../../services/contaService')
const ContaTitularService = require('../../services/contaTitularService')
const TitularService = require('../../services/titularService')

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

    async getFatura(request,response){
        const id = request.params.id
        try {
            const cartao = await CartaoService.getCartaoByTitularId2(id);
            console.log(cartao)
            const cartaoCredito = await CartaoCreditoService.getCartaoCreditoByNumCartao(cartao.cartao_num_cartao)
            const fatura = cartaoCredito.cartaocredito_fatura
            return response.status(200).json(fatura)
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

    async pagarFatura(request,response){
        try {
            const id = request.params.id
            const cartao = await CartaoService.getCartaoByTitularId2(id);
            const codConta = await TitularService.getCodConta(id);
            const saldoConta = parseInt(await ContaService.getSaldo(codConta));
            const saldoSuficiente = await CartaoCreditoService.pagarFatura(cartao.cartao_num_cartao,saldoConta);
            console.log("SALDO -> " + saldoSuficiente)
            if(saldoSuficiente == false){
                throw "Saldo Insuficiente na Conta"
            }else if(saldoSuficiente == true){
                await ContaService.removeSaldo(codConta,await CartaoCreditoService.getFatura(cartao.cartao_num_cartao));
                await CartaoCreditoService.updateFatura(cartao.cartao_num_cartao);
            }
            return response.status(200).json({
                msg: 'Fatura paga com sucesso'
            })
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
