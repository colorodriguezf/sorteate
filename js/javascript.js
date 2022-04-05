document.querySelector("#btn-agregar").addEventListener("click", agregar);
document.querySelector("#btn-reset").addEventListener("click", reset);
document.querySelector("#borrar-ultimo").addEventListener("click", borrarUltimo);
document.querySelector("#btn-sortear").addEventListener("click", sortear);

let nombres = [];

function agregar() {
  let nombre = document.getElementById("nombre").value;
  nombres.push(nombre);
  mostrar();
  //borro el valor del input
   document.getElementById("nombre").value="";
}


function reset() {
  nombres = [];
  mostrar(); 
}

function borrarUltimo() {
  nombres.pop();
  mostrar();
}

function mostrar() {
  let lista = document.getElementById("listado");
  lista.innerHTML = ""; //borro todo lo que haya
  for(let n of nombres){
    lista.innerHTML = lista.innerHTML + 
      `<li> ${n} </li>`;
  }
}

function sortear() {
  let n = Math.floor(Math.random()*nombres.length);
  document.getElementById("ganador").innerHTML ="👑🥇"+ nombres[n];
}




