if (document.getElementById("btn-agregarUsuario")) {
  document.getElementById("btn-agregarUsuario").addEventListener("click", agregarUsuario);
} 
if (document.getElementById("btn-agregarNombre")) {

  document.getElementById("btn-agregarNombre").addEventListener("click", agregarNombre);
}
document.getElementById("btn-reset").addEventListener("click", reset);
document.getElementById("btn-sortear").addEventListener("click", sortear);

let nombres="";

// SORTEO USUARIOS INSTAGRAM
function agregarUsuario() {
  let nombre = document.getElementById("nombre").value;
  // nombres.push(nombre);
  nombres = nombre.split('@');
 nombres.splice(0,1);
 console.log(nombres); 
 mostrar();
 //borro el valor del input
 document.getElementById("nombre").value="";
}
function agregarNombre() {
  let nombre = document.getElementById("nombre").value;
  // nombres.push(nombre);
 nombres = nombre.split(/\n/); 
 console.log(nombres); 
  mostrar();
  //borro el valor del input
   document.getElementById("nombre").value="";
}

function reset() {
  nombres = [];
  mostrar(); 
}


function mostrar() {
  let lista = document.getElementById("listado");
  lista.innerHTML = ""; //borro todo lo que haya
  for(const n of nombres){
    lista.innerHTML = lista.innerHTML + 
      `<li class="listaParticipantes"> ${n}<button class="borrarNombre" value=${n}>X</button></li>`;
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
  let ganadores=[];
  let total= document.getElementById("ganadores").value;
  let listaGanadores= document.getElementById("ganador");
  listaGanadores.innerHTML="";
  console.log(total);
  for (let i=0; i<total; i++) {
    listaGanadores.innerHTML="";
    let n = Math.floor(Math.random()*nombres.length);
    ganadores.push(nombres[n]);
    nombres.splice(n,1);
    console.log(n);
    console.log(ganadores);
  }
  for (const g of ganadores) {
    listaGanadores.innerHTML = listaGanadores.innerHTML +
    `<li class="listaGanadores">  ${g}</li>`;
  }

}

// SORTEO NOMBRES:




