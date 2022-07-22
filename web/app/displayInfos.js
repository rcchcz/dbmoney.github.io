window.addEventListener('load', getClientInfos());

function getClientInfos() { 
    let idClient = sessionStorage.getItem('cliente_id');
    if(idClient) {
        let request = new XMLHttpRequest();
        request.open('GET', `http://localhost:3000/titular/${idClient}`, true);
        request.send();
        request.onload  = function() {
            if (this.status == 200) {

                console.log(request.response)
                let responseData = JSON.parse(request.response);
                sessionStorage.setItem('titular_cod_conta', responseData.titular_cod_conta);
                getBalanceAccount();
                getLimitCreditCard();
            } 
        };
    }
}

function getBalanceAccount() {
    let clientAccount = sessionStorage.getItem('titular_cod_conta');
    if(clientAccount) {
        let request = new XMLHttpRequest();
        request.open('GET', `http://localhost:3000/conta/${clientAccount}`, true);
        request.send();
        request.onload  = function() {
            if (this.status == 200) {
                let responseData = JSON.parse(request.response);
                let balance_content = document.querySelector('.saldo-content');
                balance_content.innerHTML = `R$${responseData.conta_saldo}`;
            } 
        };
    }
}

function getLimitCreditCard() {
    let idClient = sessionStorage.getItem('cliente_id');
    if(idClient) {
        let request = new XMLHttpRequest();
        request.open('GET', `http://localhost:3000/cartaocredito/getFatura/${idClient}`, true);
        request.send();
        request.onload  = function() {
            if (this.status == 200) {
                let responseData = JSON.parse(request.response);
                console.log(responseData);
                // let balance_content = document.querySelector('.saldo-content');
                // balance_content.innerHTML = `R$${responseData.conta_saldo}`;
            } 
        };
    }
}