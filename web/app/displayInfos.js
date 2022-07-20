window.addEventListener('load', );

function getClientInfos() { 
    let idClient = sessionStorage.getItem('cliente_id');
    if(idClient) {
        let request = new XMLHttpRequest();
        request.open('GET', `http://localhost:3000/titular/${id}`, true);
        request.send();
        request.onload  = function() {
            if (this.status == 200) {
                let responseData = JSON.parse(request.response);
                sessionStorage.setItem('cliente_nome', responseData.cliente_nome);
            } 
        };

        request.open('GET', `http://localhost:3000/dependente/${id}`, true);
        request.send();
        request.onload  = function() {
            if (this.status == 200) {
                let responseData = JSON.parse(request.response);
                sessionStorage.setItem('cliente_nome', responseData.cliente_nome);
            } 
        };
    }
}