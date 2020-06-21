function calcularNumero() {

    var displayDeInfo = document.getElementById("info")
    matarHijos(displayDeInfo)

    var ingreso = document.getElementById("ingreso").value;

    var numero = nombreANumero(ingreso);

    while (String(numero).length > 1) {
        numero = sumarCifras(numero);
    }

    if (numero != 0) {
        document.getElementById("resultado").innerHTML = numero;
        //mostrarArchivoDeNumero(numero, displayDeInfo);
        cargarTxt(numero);
    } else (document.getElementById("resultado").innerHTML = "El ingeso no es válido");

}

function sumarCifras(valor) {
    valor = String(valor);
    var suma = 0;
    for (var i = 0; i < valor.length; i++) {
        suma += parseInt(valor[i]);
    }
    return suma;
}

function nombreANumero(cadena) {
    cadena = cadena.replace(/a|á|i|í|q|j|y/gi, "1");
    cadena = cadena.replace(/b|k|r/gi, "2");
    cadena = cadena.replace(/c|g|l|s/gi, "3");
    cadena = cadena.replace(/d|m|t/gi, "4");
    cadena = cadena.replace(/e|é|h|n/gi, "5");
    cadena = cadena.replace(/u|ú|v|w|x/gi, "6");
    cadena = cadena.replace(/o|ó|z/gi, "7");
    cadena = cadena.replace(/f|p/gi, "8");
    cadena = cadena.replace(/\D/gi, "");
    return cadena;
}


function mostrarArchivoDeNumero(cual, donde) {
    fetch("/explicaciones/" + cual + ".txt")
        .then(res => res.text())
        .then(contenido => {
            let lineas = contenido.split(/\n/);
            lineas.forEach(linea => {
                parrafo = document.createElement("p");
                parrafo.innerHTML = linea;
                donde.appendChild(parrafo);
            });
        })
}


function matarHijos(deQuien) {
    while (deQuien.firstChild) {
        deQuien.removeChild(deQuien.lastChild);
    }
}

function cargarTxt(cual) {
    jQuery.get("/explicaciones/" + cual + ".txt", function(txt){
        $("#info").text(txt);
    });

  }