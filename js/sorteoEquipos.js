document.getElementById("btn-resetNombres").addEventListener("click", vaciarNombres);

document.getElementById("sortear-ganador").addEventListener("click", agregarNombreyGenerar);
const textarea = document.getElementById('textarea');
const counter = document.getElementById('counter');
$('#sortear-ganador').attr("disabled", true); //el boton arranca deshabilitado

textarea.addEventListener('input', () => {
  const text = textarea.value;
   let count = text.trim().split('\n').length;
  counter.innerText = count;

  let total= document.getElementById("equipos");
  total.innerHTML="";
   for(let i = 1; i <= count; i++) {
    total.innerHTML+=`<option value="${i}">${i}</option>`;
   }
   if(count > 0) {
     $('#sortear-ganador').attr("disabled", false);
   }
   else {
     $('#sortear-ganador').attr("disabled", true);
   }
});
$('#close__modal').click(function () {
  $('#modalGanadores').modal('hide');
});

//Sortear equipos:
function agregarNombreyGenerar () {
    $('#contenedor-app').css('visibility', 'hidden');
    totalTime = 5;
    updateClock();
    let nombre = document.getElementById("textarea").value;
    let nombres = nombre.split(/\n/); 
    let totalEquipos= document.getElementById("equipos").value;
    let equipos = [];
    for(let i = 0; i < nombres.length; i++) {
      nombres = nombres.sort(function(){
        return Math.random() - 0.5;
      })
    }
      const LONGITUD_PEDAZOS = nombres.length/totalEquipos;
      
      for (let i = 0; i < nombres.length; i += LONGITUD_PEDAZOS) {
      let pedazo = nombres.slice(i, i + LONGITUD_PEDAZOS);
      equipos.push(pedazo);
    }
    console.log()
    let listaGanadores= document.getElementById("ganador");
    listaGanadores.innerHTML="";
    let nequipo = 1;
    for (const e of equipos) {
        listaGanadores.innerHTML = listaGanadores.innerHTML +
        `<li style="background-color:${colorHEX()}" class="listaEquipos"><p><b>Equipo Nº ${nequipo}:</b> ${e}</p></li>`;
        nequipo++;
      }
    nombres = [];
    nequipo = 1;

  
  }
  
  import confetti from 'https://cdn.skypack.dev/canvas-confetti';
  let totalTime = 5;
  function updateClock() {
      document.getElementById('countdown').innerHTML = totalTime;
      if(totalTime==0){
          console.log('Final');
          $('#countdown').css("display", "none");
          $('#contenedor-app').css('visibility', 'visible');
          $('#modalGanadores').css("display", "flex");
          $('#modalGanadores').modal('show');
          $('#comofunciona').css('display', 'flex');
            confetti();
        }else{
            totalTime-=1;
            setTimeout(updateClock, 1000);
            $('#countdown').css("display", "flex");
            $('#comofunciona').css('display', 'none');

    }
}

function vaciarNombres() {
  textarea.value="";
  counter.innerText = 0;
  let total= document.getElementById("ganadores");
  total.innerHTML="";
}



function generarLetra(){
	var letras = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
	var numero = (Math.random()*15).toFixed(0);
	return letras[numero];
}
	
function colorHEX(){
	var coolor = "";
	for(var i=0;i<6;i++){
		coolor = coolor + generarLetra() ;
	}
	return "#" + coolor;
}

function generarNumero(numero){
	return (Math.random()*numero).toFixed(0);
}

function colorRGB(){
	var coolor = "("+generarNumero(255)+"," + generarNumero(255) + "," + generarNumero(255) +")";
	return "rgb" + coolor;
}