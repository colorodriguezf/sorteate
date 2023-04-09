let cara = 0;
let cruz = 0;
let moneda = document.querySelector(".moneda");
let btnGirar = document.getElementById("btn-girar");
let btnReiniciar = document.getElementById("btn-reiniciar");

btnGirar.addEventListener("click", () => {
    let i = Math.floor(Math.random() *2);
    moneda.style.animation = "none";
    if(i) {
        setTimeout(function() {
            moneda.style.animation = "girar-cara 3s forwards";
        }, 100);
        cara++;
    }
    else {
        setTimeout(function() {
            moneda.style.animation = "girar-cruz 3s forwards";
        }, 100);
        cruz++;
    }
    setTimeout(cargarResultados, 3000);
    deshabilitarBoton();
});

function cargarResultados() {
    document.querySelector(".contador-cara").innerHTML = "Cara: "+cara;
    document.querySelector(".contador-cruz").innerHTML = "Cruz: "+cruz;
}

function deshabilitarBoton() {
    btnGirar.disabled = true;
    setTimeout(function () {
        btnGirar.disabled = false;
    },3000);
}

btnReiniciar.addEventListener("click", () => {
    moneda.style.animation = "none";
    cara = 0;
    cruz = 0;
    cargarResultados();
});