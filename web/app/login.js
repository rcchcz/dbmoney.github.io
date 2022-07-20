window.addEventListener('load', isLoggedIn());
function isLoggedIn() {
    let idClient = sessionStorage.getItem('cliente_id');
    if(idClient) {
        document.location.href = 'dashboard.html';
    }
}

let form = document.querySelector("form");
function handleSubmitForm(event) {
    event.preventDefault();
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/login');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload  = function() {
        if (this.status == 200) {
            let responseData = JSON.parse(request.response);
            sessionStorage.setItem('cliente_id', responseData.id);
            renderSidebar();
            document.location.href = 'dashboard.html';
        } else {
            let message = "Usuário e/ou senha incorretos!";
            if (message) {
                alert(message);
            }
        }
    };
    let elements = form.elements;
    let payload = buildPayload(elements);
    request.send(payload);
}
function buildPayload(elements) {
    let payload = {};
    for(let i = 0; i < elements.length; i++) {
        if(elements[i].type !== 'checkbox' && elements[i].type !== 'submit') {
            payload[elements[i].name] = elements[i].value;
        }
    }
    let payloadString = JSON.stringify(payload);
    return payloadString;
}
form.addEventListener('submit', event => handleSubmitForm(event));

function renderSidebar() {
    // icone do cliente
    let userAvatar = document.querySelector('.user-pic');
    userAvatar.innerHTML = sessionStorage.getItem('cliente_nome')[0];

    // nome do cliente
    let userName = document.querySelector('.user-name');
    userName.innerHTML = sessionStorage.getItem('cliente_nome');
}