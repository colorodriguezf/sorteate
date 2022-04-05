document.querySelector("#btn-agregar").addEventListener("click", agregar);
document.querySelector("#btn-reset").addEventListener("click", reset);
// document.querySelector("#borrar-ultimo").addEventListener("click", borrarUltimo);
document.querySelector("#btn-sortear").addEventListener("click", sortear);

let nombres="";

function agregar() {
  let nombre = document.getElementById("nombre").value;
  // nombres.push(nombre);
  //PEDIR QUE EL PRIMERO SEA SIN @ HASTA PODER ARREGLAR ESE ERROR
 nombres = nombre.split('@');
console.log(nombres); 
  mostrar();
  //borro el valor del input
   document.getElementById("nombre").value="";
}


function reset() {
  nombres = [];
  mostrar(); 
}

// function borrarUltimo() {
//   nombres.pop();
//   mostrar();
// }

function mostrar() {
  let lista = document.getElementById("listado");
  lista.innerHTML = ""; //borro todo lo que haya
  for(const n of nombres){
    lista.innerHTML = lista.innerHTML + 
      `<li> ${n} </li> <button class="borrarNombre" value=${n}>X</button>`;
  }
  let borrarNombre= document.querySelectorAll(".borrarNombre");
  for (const btn of borrarNombre) {
    console.log(btn.value);
    btn.addEventListener("click", eliminarNombre);
  }
}
function eliminarNombre() {
  let a=event.currentTarget.value;
  let indice = nombres.indexOf(a);
  console.log(indice);

  nombres.splice(indice,1);
  mostrar();
  
  console.log(nombres);

}

function sortear() {
  let n = Math.floor(Math.random()*nombres.length);
  document.getElementById("ganador").innerHTML ="👑🥇"+ nombres[n];
}




