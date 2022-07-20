const CartaoDebitoService = require('../../services/cartaoDebitoService');
//const cartaoService = require('../../services/cartaoService');
const CartaoService = require('../../services/cartaoService')
const TitularService = require('../../services/titularService')
const ContaService = require('../../services/contaService')
const DependentService = require('../../services/dependentService')

class CartaoDebitoController {
    async show_cartaoDebitoDependente(request,response){
        const { idTitular } = request.params
        try {
            const cartao = await CartaoService.getCartaoByTitularId(idTitular);
            const cartaoDebito = await CartaoDebitoService.getCartaoDebitoByNumCartao(cartao.cartao_num_cartao)
            return response.status(200).json(cartao)
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

    async show_cartaoDebitoTitular(request,response){
        const { idTitular } = request.params
        try {
            const cartao = await CartaoService.getCartaoByTitularId2(idTitular);
            const cartaoDebito = await CartaoDebitoService.getCartaoDebitoByNumCartao(cartao.cartao_num_cartao)
            return response.status(200).json(cartao)
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }

    async subtractSaldo(request,response){
        try {
            const valor = request.params.valor;
            const numCartao = request.params.numCartao;
            const isTitular = request.params.isTitular;

            if(isTitular == 'true'){
                const cartaoReceived = await CartaoService.getCartaoByNumCartao(numCartao);
                const idTitular = cartaoReceived.cartao_id_titular;
                const titularReceived = await TitularService.getTitularById(idTitular);
                const codConta = titularReceived.titular_cod_conta;
                ContaService.removeSaldo(codConta,valor);
            }else if(isTitular == 'false'){
                const dependentReceived = await DependentService.getCodContaByNumCartao(numCartao);
                const codConta = await dependentReceived.dependente_cod_conta;
                ContaService.removeSaldo(codConta,valor);
            }
;            return response.status(200).json({
                msg: "Saldo descontado com sucesso"
            }) 
        } catch (error) {
            return response.status(400).json({
                error: error
            })
        }
    }
}

module.exports = new CartaoDebitoController() 
