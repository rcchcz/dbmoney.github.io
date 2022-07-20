const EmprestimoService = require('../../services/emprestimoService')
const DependentService = require('../../services/dependentService')
const ContaService = require('../../services/contaService')
const ContaTitularService = require('../../services/contaTitularService')
const TitularService = require('../../services/titularService')

class EmprestimoController {
    async solicitarEmprestimo(request, response){
        try {
            const emprestimoReceived = request.body
            if(await DependentService.isDependente(emprestimoReceived.emprestimo_id_titular) == true){
                throw "Dependente não pode realizar empréstimo";
            }
            await EmprestimoService.insertEmprestimo(emprestimoReceived);
            const codConta = await TitularService.getCodConta(emprestimoReceived.emprestimo_id_titular);
            await ContaService.addSaldo(codConta,parseInt(emprestimoReceived.emprestimo_valor_inicial));
            response.status(200).json({
                msg: "Emprestimo Realizado com sucesso"
            })
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                error: error
            })
        }
    }

    async showEmprestimos(request,response){
        try {
            const emprestimo = await EmprestimoService.getAllEmprestimos();
            return response.status(200).json(emprestimo)
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                error: error
            })
        }
    }
}

module.exports = new EmprestimoController() 
