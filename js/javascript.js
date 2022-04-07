if (document.getElementById("btn-agregarUsuario")) {
  document.getElementById("btn-agregarUsuario").addEventListener("click", agregarUsuario);
} 
if (document.querySelector(".btn-agregarNombreySortear")) {

  document.querySelector(".btn-agregarNombreySortear").addEventListener("click", agregarNombreYSortear);
}
if (document.querySelector(".btn-reset")) {
  document.getElementById("btn-reset").addEventListener("click", reset);
}
if (document.querySelector(".btn-sortear")){
  document.querySelector(".btn-sortear").addEventListener("click", sortear);
}
if (document.getElementById("btn-resetNombres")) {
  document.getElementById("btn-resetNombres").addEventListener("click", vaciarNombres)
}

let nombres="";

// SORTEO USUARIOS INSTAGRAM
function agregarUsuario() {
  let nombre = document.getElementById("nombre").value;
  nombres = nombre.split('@');
 nombres.splice(0,1);
 console.log(nombres); 
 mostrar();
// DESACTIVADO PORQUE ROMPE EL MODAL
//  document.querySelector(".btn-sortear").disabled=false;
}
function agregarNombreYSortear() {
  let nombre = document.getElementById("nombre").value;
 nombres = nombre.split(/\n/); 
 console.log(nombres); 
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
   `<li class="listaGanadoresNombres">${g}</li>`;
 }
}
function vaciarNombres() {
document.querySelector(".textareaNombres").value="";
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
      `<li class="listaParticipantes"> ${n}<svg class="borrarNombre value=${n} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg></li>`;
  }
  let borrarNombre= document.querySelectorAll(".borrarNombre");
  for (let btn of borrarNombre) {
    console.log(btn.value);
    btn.addEventListener("click", eliminarNombre);
  }
}
function eliminarNombre() {
  let a=event.currentTarget.value;
  console.log(a);
  let indice = nombres.indexOf(a);
  console.log(indice);

  nombres.splice(indice,1);
  mostrar();
  
  console.log(nombres);

}

function sortear() {
  let ganadores=[];
  // DESACTIVADO PORQUE ROMPE EL MODAL
  // document.querySelector(".btn-sortear").disabled=true;
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
    `<li class="listaGanadores">@${g}</li>`;
  }

}

// TIRAR MONEDA
document.getElementById("tirarMoneda").addEventListener("click", girarMoneda);

function girarMoneda() {
  let moneda =["cara","cruz"];
  let rotacion="";
  let n = Math.floor(Math.random()*moneda.length);
  if (n == 0) {
    rotacion=8;
    document.getElementById("img-cara").src= "img/monedaCRUZ.png";
  }
  else {
    rotacion=9;
    document.getElementById("img-cara").src= "img/monedaCara.png";
  }
  console.log(rotacion);

}






