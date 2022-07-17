function validate_boleto() {
    var val = document.getElementById("valor-boleto").value
    if(!isNaN(val) && parseInt(val, 10) > 0) { 
        alert("Boleto para depósito gerado com sucesso!");
        download_boleto(val) 
    } else {
        alert("Valor deve ser numérico!");
    }
}

function download_boleto(val) {
    var boleto = generate_boleto()
    var filename = "boleto.txt"
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("$" + val + " | num: " + boleto));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function generate_boleto() {
    var code = "";
    for(var i = 0; i < 20; i++) { code += Math.floor(Math.random() * 9); }
    return code;
}

function confirm_recarga() {
    alert("Recarga em processo!");
}
  