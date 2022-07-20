const DbConnection = require('../database/connection')

class EmprestimoService{
    async insertEmprestimo(emprestimoReceived){
        try {
            const database = await DbConnection();
            const insertQuery = 'insert into emprestimo (emprestimo_taxa_juros,emprestimo_prazo,emprestimo_valor_inicial,emprestimo_valor_final,emprestimo_id_titular)'
            +' values (?,?,?,?,?)';
            const values = [0.1,''+((new Date().getFullYear())+5)+'-'+new Date().getMonth()+'-'+new Date().getDay(),emprestimoReceived.emprestimo_valor_inicial,
            (parseInt(emprestimoReceived.emprestimo_valor_inicial)+((parseInt(emprestimoReceived.emprestimo_valor_inicial)*0.1*5))),emprestimoReceived.emprestimo_id_titular];
            await database.query(insertQuery,values);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async getAllEmprestimos(){
        try {
            const database = await DbConnection()
            const [emprestimos] = await database.query('SELECT * FROM emprestimo;')
            if(emprestimos.length > 0 ){
                return emprestimos
            }
            throw "Não há emprestimos realizados";
        } catch (error) {
            console.log(error);
            return error
        }
    }
}

module.exports = new EmprestimoService();
