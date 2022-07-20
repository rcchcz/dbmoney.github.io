window.addEventListener('load', event => isAuthenticated(event));
function isAuthenticated(event) {
    event.preventDefault();
    let idClient = sessionStorage.getItem('cliente_id');
    if(idClient) {
        getClient(idClient);
    } else {
        alert("Usuário não autenticado!");
        document.location.href = 'index.html';
    }
}

function logOut() {
    localStorage.removeItem('cliente_id');
    document.location.href = 'index.html';
}

function getClient(id) {
    let request = new XMLHttpRequest();
    request.open('GET', `http://localhost:3000/user/${id}`, true);
    request.send();
    request.onload  = function() {
        if (this.status == 200) {
            let responseData = JSON.parse(request.response);
            sessionStorage.setItem('cliente_nome', responseData.cliente_nome);
        } 
    };
}

document.addEventListener("DOMContentLoaded", function(event) {
    event.preventDefault();
    let idClient = sessionStorage.getItem('cliente_id');
    let nameClient = sessionStorage.getItem('cliente_nome');
    if(idClient && nameClient) {
        renderSidebar();
    }
})

function renderSidebar() {
    // icone do cliente
    let userAvatar = document.querySelector('.user-pic');
    userAvatar.innerHTML = sessionStorage.getItem('cliente_nome')[0];

    // nome do cliente
    let userName = document.querySelector('.user-name');
    userName.innerHTML = sessionStorage.getItem('cliente_nome');
}