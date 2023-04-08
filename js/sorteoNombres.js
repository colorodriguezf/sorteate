document.getElementById("btn-resetNombres").addEventListener("click", vaciarNombres);

document.getElementById("sortear-ganador").addEventListener("click", sortearGanador);
const textarea = document.getElementById('textarea');
const counter = document.getElementById('counter');
$('#sortear-ganador').attr("disabled", true); //el boton arranca deshabilitado

textarea.addEventListener('input', () => {
  const text = textarea.value;
   let count = text.trim().split('\n').length;
  counter.innerText = count;

  let total= document.getElementById("ganadores");
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


function sortearGanador() {
    $('#contenedor-app').css('visibility', 'hidden');
    totalTime = 5;
    updateClock();
    let nombre = document.getElementById("textarea").value;
  let nombres = nombre.split(/\n/); 
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
   if(total==1) {
    $('#modal-title').html('Ganador');
   }
   else {
    $('#modal-title').html('Ganadorores:');
   }
   for (const g of ganadores) {
     listaGanadores.innerHTML = listaGanadores.innerHTML +
     `<li class="listaGanadoresNombres">${g}</li>`;
   }
  }  
  
  import confetti from 'https://cdn.skypack.dev/canvas-confetti';
  let totalTime = 5;
  function updateClock() {
    console.log(totalTime);
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

