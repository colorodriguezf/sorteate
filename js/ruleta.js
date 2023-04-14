const inputPalabras = document.getElementById("inputPalabras");
const botonAgregarPalabras = document.getElementById("botonAgregarPalabras");
const listaPalabras = document.getElementById("lista-palabras");
const nombreSeleccionado = document.getElementById("nombre-seleccionado");
const wink = document.getElementById("wink");
const spinSound = document.getElementById("spin-sound");
const whoosh = document.getElementById("whoosh");
const lastName = document.getElementById("last-name");
const tic = document.getElementById("tic");
const time = document.getElementById("time");
const botonLimpiarOpciones = document.getElementById("limpiar-opciones");
const alerta = document.getElementById("alerta");
const canvas = document.getElementById("canvas");
const randomColorOffset = parseInt(Math.random() * 147);
let options = [];
let startAngle = 0;
let arc = Math.PI / (options.length / 2);
let spinTimeout = null;
let spinArcStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;
let ctx;
let counterNames = 0;
let centerX;
let centerY;
let outsideRadius;
let textRadius;
let insideRadius;
const nombres = [
"Default",
"Default",
"Default",
];

const fixedStartTime = () => {
  return parseInt(new Date().getTime() / 1000) * 1000;
};

const resetCounterNames = () => {
  counterNames = 0;
};

const increaseCountName = () => {
  counterNames++;
};

const randomPastelColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const shuffleList = (arr) => {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const shiftPositions = (arr, offset) => {
  let shifted = [];
  for (let i = 0; i < arr.length; i++) {
    shifted.push(arr[(i + offset) % arr.length]);
  }
  return shifted;
};

const createColorPallete = (max) => {
    let colors = ["#51BBA8","#8DF33E", "#FFA0F3", "#FF6896", "#CB70FE", "#70A6FE", "#FED170"];
    for (let acc = 0, n = 0; n < max; n += 1) {
      console.log(n);
      colors.push(`hsl(${(228 + acc) % 360}deg 83% 65%)`);
      acc += parseInt(Math.random() * 50 + 10);
    }
    return colors;
};

const colorPallete = shiftPositions(
  createColorPallete(nombres.length),
  randomColorOffset
);
// shuffleList([
//   "#cc99c9",
//   "#9ec1cf",
//   "#9ee09e",
//   "#fdfd97",
//   "#feb144",
//   "#ff6663",
//   "#fb8b24ff",
//   "#d90368ff",
//   "#04a777ff",
//   "#005d8f",
//   "#d62828",
//   "#f77f00",
//   "#fcbf49",
//   "#eae2b7"
// ]);

function prevenirForm(e) {
  e.preventDefault();
}

const createItem = (name) => {
  const item = document.createElement("div");
  item.className = "nombre";
  item.innerHTML = name;
  item.onclick = () => {
    deleteItem(name);
    dibujarRuleta();
  };
  return item;
};

const addItem = (valor) => {
  const name = valor.toUpperCase();
  options.push(name);
  listaPalabras.appendChild(createItem(name));
  dibujarRuleta();
}

const deleteItem = (name) => {
  const itemsElements = [].slice.call(listaPalabras.children);
  const li = itemsElements.filter((li) =>
    li.innerText.toUpperCase().includes(name)
  )[0];

  var index = options.indexOf(name);
  if (index > -1) {
    options.splice(index, 1);
    colorPallete.splice(index, 1);
  }
  listaPalabras.removeChild(li);
  whoosh.pause();
  whoosh.currentTime = 0;
  whoosh.play();
};

const byte2Hex = (n) => {
  var nybHexString = "0123456789ABCDEF";
  return (
    String(nybHexString.substr((n >> 4) & 0x0f, 1)) +
    nybHexString.substr(n & 0x0f, 1)
  );
};

const RGB2Color = (r, g, b) => {
  return "#" + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
};

const getColor = (index, maxItem) => {
  return colorPallete[index % colorPallete.length];
};

const dibujarRuleta = () => {
  arc = Math.PI / (options.length / 2);
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(centerX, centerY);

  /*ctx.beginPath();
      ctx.arc(0, 0, 5, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#555';
      ctx.fill();
  */
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;

  ctx.font = "16px Helvetica, Arial";

  for (var i = 0; i < options.length; i++) {
    var angle = startAngle + i * arc;
    ctx.fillStyle = getColor(i, options.length);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.globalCompositeOperation = "multiply";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.arc(0, 0, outsideRadius, angle, angle + arc, false);
    ctx.arc(0, 0, insideRadius, angle + arc, angle, true);
    ctx.stroke();
    ctx.fill();

    ctx.save();
    ctx.shadowOffsetX = -1;
    ctx.shadowOffsetY = -1;
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#222";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.translate(
      0 + Math.cos(angle + arc / 2) * textRadius,
      0 + Math.sin(angle + arc / 2) * textRadius
    );
    ctx.rotate(angle + arc / 2 + Math.PI); //rotacion nombres

    ctx.globalCompositeOperation = "source-over";
    ctx.font = "bold 20px Arial"; //letra nombres
    var text = options[i];

    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  }

  ctx.fillStyle = "#363636"; //color flecha
  ctx.beginPath();
  ctx.moveTo(0 - 4, 0 - (outsideRadius + 10));
  ctx.lineTo(0 + 4, 0 - (outsideRadius + 10));
  ctx.lineTo(0 + 4, 0 - (outsideRadius - 10));
  ctx.lineTo(0 + 9, 0 - (outsideRadius - 10));
  ctx.lineTo(0 + 0, 0 - (outsideRadius - 18));
  ctx.lineTo(0 - 9, 0 - (outsideRadius - 10));
  ctx.lineTo(0 - 4, 0 - (outsideRadius - 10));
  ctx.lineTo(0 - 4, 0 - (outsideRadius + 10));
  ctx.fill();
  ctx.restore();

  cursorPosition();
};
let  spinAngleStart = Math.random() * (Math.PI * 2) + Math.PI * 2.5;
const spin = () => {
  resetCounterNames();
  if (spinTime >= spinTimeTotal) {
    spinSound.currentTime = 0;
    spinSound.play();
    if (options.length < 1) {
      alerta.style.display = "block";
      alerta.innerText = "Debe haber al menos 2 opciones";
    } else {
      spinAngleStart = Math.random() * (Math.PI * 2) + Math.PI * 2.5;
      spinTime = 0;
      spinTimeTotal = Math.abs(Math.random() * 500) + 5000;
      rotateWheel();
    }
  }
};

const rotateWheel = () => {
  spinTime += 19;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
  } else {
    const spinAngle =
      spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    dibujarRuleta();
    requestAnimationFrame(rotateWheel);
  }
};

const stopRotateWheel = () => {
  const degrees = (startAngle * 180) / Math.PI + 90;
  const arcd = (arc * 180) / Math.PI;
  const index = Math.floor((360 - (degrees % 360)) / arcd);
  const name = options[index]; //ganador centro ruleta

  setNombreSeleccionado(options[index]);
  increaseCountName();

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.fillStyle = "#FFD700 ";
  ctx.font = "bold 34px Arial";
  ctx.fillText(name, 0 - ctx.measureText(name).width / 2, 0 - 270); //ubicacion ganador
  ctx.fillStyle = "#eee";
  ctx.restore();

  spinSound.pause();
  spinSound.currentTime = 0;

  if (options.length == 1) {
    lastName.play();
  } else if (options.length > 1) {
    wink.play();
    setTimeout(() => deleteItem(name), 750);
  }
};

const easeOut = (t, b, c, d) => {
  const ts = (t /= d) * t;
  const tc = ts * t;
  //console.log("in: ",t, b, c, d);
  const eased = b + c * (tc + -3 * ts + 3 * t);
  ///console.log("out: ", eased);
  return eased;
};

const setNombreSeleccionado = (name) => {
  nombreSeleccionado.innerText = name;
};

const position = {
  degrees: 0,
  arcd: 0,
  index: 0,
  name: 0
};

const cursorPosition = function () {
  position.degrees = (startAngle * 180) / Math.PI + 90;
  position.arcd = (arc * 180) / Math.PI;
  let newIndex = Math.floor((360 - (position.degrees % 360)) / position.arcd);
  if (newIndex !== position.index) {
    position.index = newIndex;
    position.name = options[position.index];
    //console.log(position);
    /* performance issues, how can i reduce latency?
       -> find exact init time*/
    tic.currentTime = 0;
    if (tic.paused) {
      tic.play();
    }
  }
};


window.onmouseup = function () {
  document.querySelectorAll(".seccion").forEach(function (seccion) {
    seccion.classList.remove("buttonDown");
  });
};

document.querySelectorAll(".seccion").forEach(function (seccion) {
  seccion.onmousedown = function () {
    this.classList.add("buttonDown");
  };
});

document.getElementById("spin").addEventListener("click", spin);

inputPalabras.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    botonAgregarPalabras.click();
  }
});

window.addEventListener("keydown", function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
    spin();
  }
});

botonAgregarPalabras.addEventListener("click", () => {
  if (inputPalabras.value != "" && options.length < 60) {
    let names = inputPalabras.value.split(";");
    names.forEach((name) => {
      if (name.length > 0) {
        addItem(name);
      }
    });
    createColorPallete();
    inputPalabras.value = "";
    alerta.style.display = "none";
  }
  if (options.length >= 35) {
    alerta.innerHTML = "Ya agregaste demasiadas palabras.";
    alerta.style.display = "block";
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
});

botonLimpiarOpciones.addEventListener("click", function () {
  lastName.play();
  if (window.confirm("¿Borrar todas las opciones?")) {
    listaPalabras.innerHTML = '';
    options = [];
    addItem('default');
    dibujarRuleta();
  }
});

window.onload = function () {
  ctx = canvas.getContext("2d");
  outsideRadius = 255;
  textRadius = 180;
  insideRadius = 5;
  centerX = canvas.width / 2;
  centerY = canvas.height / 1.87;
  console.log(centerX, centerY);

  nombres.forEach((nombre) => {
    addItem(nombre);
  });

  dibujarRuleta();
  wink.volume = 0.11;
  spinSound.volume = 0.29;
  whoosh.volume = 0.001;
  lastName.volume = 0.3;
  tic.volume = 0.29;
};
