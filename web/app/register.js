let form = document.querySelector("form");
function handleSubmitForm(event) {
    event.preventDefault();
    let elements = form.elements;
    let payload = buildPayload(elements);
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/titular');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload  = function() {
        if (this.status == 200) {
            let sucessMessage = "Cadastro realizado com sucesso!";
            alert(sucessMessage);
            document.location.href = 'index.html';
        } else {
            let message = "Cadastro não foi realizado com sucesso." + 
                "\n Tente novamente!";
            if (message) {
                alert(message);
            }
            form.reset();
        }
    };
    request.send(payload);
}
function buildPayload(elements) {
    let payload = {};
    for(let i = 0; i < elements.length; i++) {
        if(elements[i].type !== 'checkbox' && elements[i].type !== 'submit'
            && elements[i].name !== 'password') {
            payload[elements[i].name] = elements[i].value;
        }
    }
    let payloadString = JSON.stringify(payload);
    return payloadString;
}
form.addEventListener('submit', event => handleSubmitForm(event));

function validateForm() {
    
}