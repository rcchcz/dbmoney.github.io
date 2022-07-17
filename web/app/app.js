function download_boleto() {
    var boleto = generate_boleto()
    var filename = "boleto.txt"
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(boleto));
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
  