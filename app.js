/* =========================================================
   VITALIS - app.js
   Archivo único de JavaScript.
   Contiene: login, menú hamburguesa, navegación y todas
   las funcionalidades que cubren las Historias de Usuario
   (US-01 a US-50) del documento del proyecto.
========================================================= */

/* ---------------------------------------------------------
   1. LOGIN (usuario y contraseña predeterminados, sin registro)
--------------------------------------------------------- */
const USUARIO_VALIDO = "estudiante";
const CLAVE_VALIDA = "vitalis2026";

const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const loginScreen = document.getElementById("login-screen");
const app = document.getElementById("app");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value.trim();

  if (usuario === "" || clave === "") {
    loginError.textContent = "Por favor completa usuario y contraseña.";
    return;
  }

  if (usuario === USUARIO_VALIDO && clave === CLAVE_VALIDA) {
    loginError.textContent = "";
    loginScreen.classList.add("oculto");
    app.classList.remove("oculto");
    iniciarApp();
  } else {
    loginError.textContent = "Usuario o contraseña incorrectos.";
  }
});

document.getElementById("btn-cerrar-sesion").addEventListener("click", function () {
  app.classList.add("oculto");
  loginScreen.classList.remove("oculto");
  document.getElementById("usuario").value = "";
  document.getElementById("clave").value = "";
});


/* ---------------------------------------------------------
   2. MENÚ HAMBURGUESA (navegación móvil)
--------------------------------------------------------- */
const btnHamburguesa = document.getElementById("btn-hamburguesa");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

btnHamburguesa.addEventListener("click", function () {
  sidebar.classList.toggle("abierto");
  overlay.classList.toggle("oculto");
});

overlay.addEventListener("click", function () {
  sidebar.classList.remove("abierto");
  overlay.classList.add("oculto");
});

/* Navegación entre secciones (US-13: máximo 2 toques) */
const enlacesNav = document.querySelectorAll(".nav-link");
enlacesNav.forEach(function (enlace) {
  enlace.addEventListener("click", function (e) {
    e.preventDefault();
    mostrarSeccion(enlace.getAttribute("data-seccion"));
    enlacesNav.forEach(function (l) { l.classList.remove("activo"); });
    enlace.classList.add("activo");
    sidebar.classList.remove("abierto");
    overlay.classList.add("oculto");
  });
});

/* Botones de acceso rápido dentro de "Inicio" */
document.querySelectorAll(".acceso-rapido").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const destino = btn.getAttribute("data-ir");
    mostrarSeccion(destino);
    enlacesNav.forEach(function (l) {
      l.classList.toggle("activo", l.getAttribute("data-seccion") === destino);
    });
  });
});

function mostrarSeccion(idSeccion) {
  document.querySelectorAll(".seccion").forEach(function (s) {
    s.classList.remove("activa");
  });
  document.getElementById(idSeccion).classList.add("activa");
}


/* ---------------------------------------------------------
   3. FUNCIÓN PRINCIPAL AL INICIAR SESIÓN
--------------------------------------------------------- */
function iniciarApp() {
  mostrarFechaHoy();
  actualizarResumen();
  iniciarTiempoPantalla();
}

function mostrarFechaHoy() {
  const hoy = new Date();
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                 "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  document.getElementById("fecha-hoy").textContent =
    dias[hoy.getDay()] + " " + hoy.getDate() + " de " + meses[hoy.getMonth()] + ", " + hoy.getFullYear();
}


/* ---------------------------------------------------------
   4. ALMACENAMIENTO LOCAL (localStorage)
   Se usa para que los datos no se pierdan al recargar.
--------------------------------------------------------- */
function guardarDato(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

function leerDato(clave, porDefecto) {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : porDefecto;
}


/* ---------------------------------------------------------
   5. BANNER DE ALERTAS NO INVASIVAS (US-05, US-11, US-34, US-42)
--------------------------------------------------------- */
function mostrarAlerta(mensaje, icono) {
  const notifSilenciosas = document.getElementById("check-notif-silenciosas").checked;
  if (notifSilenciosas) return; // Respeta el modo silencioso

  const banner = document.getElementById("banner-alerta");

  /* Si se indica un ícono de Font Awesome, se muestra antes del mensaje */
  if (icono) {
    banner.innerHTML = '<i class="fa-solid ' + icono + '"></i> ' + mensaje;
  } else {
    banner.textContent = mensaje;
  }

  banner.classList.remove("oculto");

  setTimeout(function () {
    banner.classList.add("oculto");
  }, 6000);
}


/* ===========================================================
   SECCIÓN: ESTADO EMOCIONAL
   US-01, US-02, US-05, US-11, US-14, US-17, US-19
=========================================================== */

/* US-14: Mood tracking de un clic */
let moodBotones = document.querySelectorAll(".mood-btn");
moodBotones.forEach(function (btn) {
  btn.addEventListener("click", function () {
    moodBotones.forEach(function (b) { b.classList.remove("seleccionado"); });
    btn.classList.add("seleccionado");
    const mood = btn.getAttribute("data-mood");
    guardarDato("vitalis_mood_hoy", mood);
    document.getElementById("mood-guardado").textContent = "Ánimo guardado: " + mood;
    actualizarResumen();
  });
});

/* US-01: Registro emocional diario (nota de texto) */
document.getElementById("btn-guardar-nota").addEventListener("click", function () {
  const nota = document.getElementById("nota-emocional").value.trim();
  if (nota === "") return;
  const notas = leerDato("vitalis_notas_emocionales", []);
  notas.push({ texto: nota, fecha: new Date().toLocaleString() });
  guardarDato("vitalis_notas_emocionales", notas);
  document.getElementById("nota-emocional").value = "";
  mostrarAlerta("Registro emocional guardado.");
});

/* US-02 / US-05 / US-11 / US-17: Nivel de estrés + historial + alertas */
const sliderEstres = document.getElementById("slider-estres");
sliderEstres.addEventListener("input", function () {
  document.getElementById("valor-estres").textContent = sliderEstres.value;
});

document.getElementById("btn-guardar-estres").addEventListener("click", function () {
  const valor = parseInt(sliderEstres.value);
  const historial = leerDato("vitalis_historial_estres", []);
  historial.push(valor);
  if (historial.length > 10) historial.shift(); // solo guarda los últimos 10
  guardarDato("vitalis_historial_estres", historial);
  guardarDato("vitalis_estres_hoy", valor);

  dibujarHistorialEstres(historial);
  actualizarResumen();

  /* US-05: alerta si el estrés es elevado */
  if (valor >= 8) {
    mostrarAlerta("Tu nivel de estrés es alto. Considera tomar una pausa activa.", "fa-triangle-exclamation");
  }

  /* US-11: alerta de posible burnout (3 registros altos seguidos) */
  const ultimosTres = historial.slice(-3);
  if (ultimosTres.length === 3 && ultimosTres.every(function (v) { return v >= 7; })) {
    mostrarAlerta("Hemos notado un patrón de estrés sostenido. Cuida tu descanso.", "fa-bell");
  }
});

function dibujarHistorialEstres(historial) {
  const contenedor = document.getElementById("historial-estres");
  contenedor.innerHTML = "";
  historial.forEach(function (valor) {
    const barra = document.createElement("div");
    barra.className = "barra-historial";
    barra.style.height = (valor * 8) + "px";
    barra.title = "Estrés: " + valor;
    contenedor.appendChild(barra);
  });
}

/* US-19: Botón de ayuda de emergencia */
document.getElementById("btn-ayuda-emergencia").addEventListener("click", function () {
  document.getElementById("info-emergencia").classList.toggle("oculto");
});


/* ===========================================================
   SECCIÓN: HÁBITOS Y METAS
   US-04, US-10, US-18, US-21, US-29, US-43, US-49, US-50
=========================================================== */

/* US-04 / US-18: Registro de sueño */
document.getElementById("btn-guardar-sueno").addEventListener("click", function () {
  const horas = document.getElementById("horas-sueno").value;
  if (horas === "") return;
  guardarDato("vitalis_sueno_hoy", horas);
  document.getElementById("lista-sueno").textContent = "Última noche registrada: " + horas + " horas";
  actualizarResumen();
});

/* US-49: Nivel de concentración */
const sliderConcentracion = document.getElementById("slider-concentracion");
sliderConcentracion.addEventListener("input", function () {
  document.getElementById("valor-concentracion").textContent = sliderConcentracion.value;
});
document.getElementById("btn-guardar-concentracion").addEventListener("click", function () {
  guardarDato("vitalis_concentracion", sliderConcentracion.value);
  mostrarAlerta("Nivel de concentración registrado.");
});

/* US-10: Sugerencia de hábito progresivo con IA (simulada) */
const sugerenciasHabitos = {
  dormir: "Empieza acostándote 15 minutos antes hoy. Mañana repite el mismo horario.",
  leer: "Lee solo 5 páginas hoy, sin presión. La constancia importa más que la cantidad.",
  ejercicio: "Haz una caminata de 10 minutos hoy. Súmale 2 minutos cada semana.",
  estudiar: "Estudia con la técnica de 15 minutos: pon un temporizador y empieza sin distracciones.",
  orden: "Ordena solo un cajón o superficie hoy. Un espacio pequeño a la vez."
};

document.getElementById("btn-sugerir-habito").addEventListener("click", function () {
  const habito = document.getElementById("select-habito").value;
  document.getElementById("resultado-habito").textContent = sugerenciasHabitos[habito];
});

/* US-50 / US-29: Metas personales (lista con check) */
document.getElementById("btn-agregar-meta").addEventListener("click", function () {
  const input = document.getElementById("nueva-meta");
  if (input.value.trim() === "") return;
  const metas = leerDato("vitalis_metas", []);
  metas.push({ texto: input.value.trim(), hecha: false });
  guardarDato("vitalis_metas", metas);
  input.value = "";
  dibujarMetas();
});

function dibujarMetas() {
  const metas = leerDato("vitalis_metas", []);
  const lista = document.getElementById("lista-metas");
  lista.innerHTML = "";
  metas.forEach(function (meta, indice) {
    const li = document.createElement("li");
    li.innerHTML =
      '<input type="checkbox" ' + (meta.hecha ? "checked" : "") + ' data-indice="' + indice + '" class="check-meta">' +
      '<span class="' + (meta.hecha ? "completada" : "") + '">' + meta.texto + '</span>' +
      '<button class="btn-borrar" data-borrar="' + indice + '"><i class="fa-solid fa-trash"></i></button>';
    lista.appendChild(li);
  });

  document.querySelectorAll(".check-meta").forEach(function (chk) {
    chk.addEventListener("change", function () {
      const metasActuales = leerDato("vitalis_metas", []);
      metasActuales[chk.getAttribute("data-indice")].hecha = chk.checked;
      guardarDato("vitalis_metas", metasActuales);
      dibujarMetas();
      actualizarResumen();
    });
  });

  document.querySelectorAll("#lista-metas .btn-borrar").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const metasActuales = leerDato("vitalis_metas", []);
      metasActuales.splice(btn.getAttribute("data-borrar"), 1);
      guardarDato("vitalis_metas", metasActuales);
      dibujarMetas();
      actualizarResumen();
    });
  });
}

/* US-21: Recordatorio de hidratación */
document.getElementById("btn-tome-agua").addEventListener("click", function () {
  let contador = leerDato("vitalis_agua_hoy", 0);
  contador++;
  guardarDato("vitalis_agua_hoy", contador);
  document.getElementById("contador-agua").textContent = contador;
});

/* Recordatorio periódico de hidratación cada 30 minutos (no invasivo) */
setInterval(function () {
  mostrarAlerta("Recuerda tomar un vaso de agua.", "fa-droplet");
}, 30 * 60 * 1000);


/* ===========================================================
   SECCIÓN: TAREAS Y HORARIOS
   US-03, US-06, US-22, US-23, US-24, US-25, US-26,
   US-27, US-28, US-30, US-38, US-39, US-40, US-41
=========================================================== */

/* US-22: Modo oficina (oculta tareas académicas) */
document.getElementById("check-modo-oficina").addEventListener("change", dibujarTareas);

/* US-30: Aviso de semana de parciales */
document.getElementById("check-modo-parciales").addEventListener("change", function () {
  document.getElementById("aviso-parciales").classList.toggle("oculto", !this.checked);
});

/* US-24 / US-03 / US-26 / US-25 / US-41: Checklist diario con prioridad, bloque y hora */
document.getElementById("btn-agregar-tarea").addEventListener("click", function () {
  const texto = document.getElementById("nueva-tarea").value.trim();
  if (texto === "") return;

  const tarea = {
    texto: texto,
    prioridad: document.getElementById("prioridad-tarea").value,
    bloque: document.getElementById("bloque-tarea").value,
    turno: document.getElementById("turno-tarea").value,
    hora: document.getElementById("hora-tarea").value,
    hecha: false
  };

  const tareas = leerDato("vitalis_tareas", []);
  tareas.push(tarea);
  guardarDato("vitalis_tareas", tareas);

  document.getElementById("nueva-tarea").value = "";
  document.getElementById("hora-tarea").value = "";
  dibujarTareas();
});

function dibujarTareas() {
  const tareas = leerDato("vitalis_tareas", []);
  const modoOficina = document.getElementById("check-modo-oficina").checked;
  const lista = document.getElementById("lista-tareas");
  lista.innerHTML = "";

  tareas.forEach(function (tarea, indice) {
    /* US-22: si el modo oficina está activo, ocultamos tareas académicas */
    if (modoOficina && tarea.bloque === "academico") return;

    const li = document.createElement("li");
    li.innerHTML =
      '<input type="checkbox" ' + (tarea.hecha ? "checked" : "") + ' data-indice="' + indice + '" class="check-tarea">' +
      '<span class="' + (tarea.hecha ? "completada" : "") + '">' + tarea.texto +
      (tarea.hora ? " (" + tarea.hora + ")" : "") + " — " + tarea.turno + '</span>' +
      '<span class="etiqueta-prioridad prioridad-' + tarea.prioridad + '">' + tarea.prioridad + '</span>' +
      '<button class="btn-borrar" data-borrar="' + indice + '"><i class="fa-solid fa-trash"></i></button>';
    lista.appendChild(li);
  });

  document.querySelectorAll(".check-tarea").forEach(function (chk) {
    chk.addEventListener("change", function () {
      const tareasActuales = leerDato("vitalis_tareas", []);
      tareasActuales[chk.getAttribute("data-indice")].hecha = chk.checked;
      guardarDato("vitalis_tareas", tareasActuales);
      dibujarTareas();
      actualizarResumen();
    });
  });

  document.querySelectorAll("#lista-tareas .btn-borrar").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const tareasActuales = leerDato("vitalis_tareas", []);
      tareasActuales.splice(btn.getAttribute("data-borrar"), 1);
      guardarDato("vitalis_tareas", tareasActuales);
      dibujarTareas();
      actualizarResumen();
    });
  });
}

/* US-27: Pomodoro minimalista */
let pomodoroSegundos = 25 * 60;
let pomodoroIntervalo = null;

function actualizarRelojPomodoro() {
  const minutos = Math.floor(pomodoroSegundos / 60);
  const segundos = pomodoroSegundos % 60;
  document.getElementById("pomodoro-reloj").textContent =
    String(minutos).padStart(2, "0") + ":" + String(segundos).padStart(2, "0");
}

document.getElementById("btn-pomodoro-iniciar").addEventListener("click", function () {
  if (pomodoroIntervalo) return;
  pomodoroIntervalo = setInterval(function () {
    if (pomodoroSegundos > 0) {
      pomodoroSegundos--;
      actualizarRelojPomodoro();
    } else {
      clearInterval(pomodoroIntervalo);
      pomodoroIntervalo = null;
      mostrarAlerta("¡Pomodoro terminado! Toma un descanso.", "fa-clock");
    }
  }, 1000);
});

document.getElementById("btn-pomodoro-pausar").addEventListener("click", function () {
  clearInterval(pomodoroIntervalo);
  pomodoroIntervalo = null;
});

document.getElementById("btn-pomodoro-reiniciar").addEventListener("click", function () {
  clearInterval(pomodoroIntervalo);
  pomodoroIntervalo = null;
  pomodoroSegundos = 25 * 60;
  actualizarRelojPomodoro();
});

/* US-06: Horarios de estudio */
document.getElementById("btn-agregar-horario").addEventListener("click", function () {
  const materia = document.getElementById("materia-horario").value.trim();
  const dia = document.getElementById("dia-horario").value.trim();
  const hora = document.getElementById("hora-horario").value;
  if (materia === "" || dia === "") return;

  const horarios = leerDato("vitalis_horarios", []);
  horarios.push({ materia: materia, dia: dia, hora: hora });
  guardarDato("vitalis_horarios", horarios);

  document.getElementById("materia-horario").value = "";
  document.getElementById("dia-horario").value = "";
  document.getElementById("hora-horario").value = "";
  dibujarHorarios();
});

function dibujarHorarios() {
  const horarios = leerDato("vitalis_horarios", []);
  const lista = document.getElementById("lista-horarios");
  lista.innerHTML = "";
  horarios.forEach(function (h, indice) {
    const li = document.createElement("li");
    li.innerHTML =
      '<span>' + h.dia + " - " + h.materia + (h.hora ? " (" + h.hora + ")" : "") + '</span>' +
      '<button class="btn-borrar" data-borrar="' + indice + '"><i class="fa-solid fa-trash"></i></button>';
    lista.appendChild(li);
  });
  document.querySelectorAll("#lista-horarios .btn-borrar").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const actuales = leerDato("vitalis_horarios", []);
      actuales.splice(btn.getAttribute("data-borrar"), 1);
      guardarDato("vitalis_horarios", actuales);
      dibujarHorarios();
    });
  });
}

/* US-23: Agenda de exámenes */
document.getElementById("btn-agregar-examen").addEventListener("click", function () {
  const curso = document.getElementById("curso-examen").value.trim();
  const fecha = document.getElementById("fecha-examen").value;
  if (curso === "" || fecha === "") return;

  const examenes = leerDato("vitalis_examenes", []);
  examenes.push({ curso: curso, fecha: fecha });
  examenes.sort(function (a, b) { return a.fecha.localeCompare(b.fecha); });
  guardarDato("vitalis_examenes", examenes);

  document.getElementById("curso-examen").value = "";
  document.getElementById("fecha-examen").value = "";
  dibujarExamenes();
});

function dibujarExamenes() {
  const examenes = leerDato("vitalis_examenes", []);
  const lista = document.getElementById("lista-examenes");
  lista.innerHTML = "";
  examenes.forEach(function (ex, indice) {
    const li = document.createElement("li");
    li.innerHTML =
      '<span>' + ex.curso + " — " + ex.fecha + '</span>' +
      '<button class="btn-borrar" data-borrar="' + indice + '"><i class="fa-solid fa-trash"></i></button>';
    lista.appendChild(li);
  });
  document.querySelectorAll("#lista-examenes .btn-borrar").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const actuales = leerDato("vitalis_examenes", []);
      actuales.splice(btn.getAttribute("data-borrar"), 1);
      guardarDato("vitalis_examenes", actuales);
      dibujarExamenes();
    });
  });
}

/* US-38 / US-39 / US-40: Objetivos académicos */
document.getElementById("btn-agregar-objetivo").addEventListener("click", function () {
  const texto = document.getElementById("nuevo-objetivo").value.trim();
  if (texto === "") return;
  const esSemanal = document.getElementById("objetivo-semanal").checked;

  const objetivos = leerDato("vitalis_objetivos", []);
  objetivos.push({ texto: texto, semanal: esSemanal, hecho: false });
  guardarDato("vitalis_objetivos", objetivos);

  document.getElementById("nuevo-objetivo").value = "";
  document.getElementById("objetivo-semanal").checked = false;
  dibujarObjetivos();
});

function dibujarObjetivos() {
  const objetivos = leerDato("vitalis_objetivos", []);
  const lista = document.getElementById("lista-objetivos");
  lista.innerHTML = "";

  objetivos.forEach(function (obj, indice) {
    const li = document.createElement("li");
    li.innerHTML =
      '<input type="checkbox" ' + (obj.hecho ? "checked" : "") + ' data-indice="' + indice + '" class="check-objetivo">' +
      '<span class="' + (obj.hecho ? "completada" : "") + '">' + obj.texto + (obj.semanal ? " (semanal)" : "") + '</span>' +
      '<button class="btn-borrar" data-borrar="' + indice + '"><i class="fa-solid fa-trash"></i></button>';
    lista.appendChild(li);
  });

  document.querySelectorAll(".check-objetivo").forEach(function (chk) {
    chk.addEventListener("change", function () {
      const actuales = leerDato("vitalis_objetivos", []);
      actuales[chk.getAttribute("data-indice")].hecho = chk.checked;
      guardarDato("vitalis_objetivos", actuales);
      dibujarObjetivos();
      actualizarResumen();
    });
  });

  document.querySelectorAll("#lista-objetivos .btn-borrar").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const actuales = leerDato("vitalis_objetivos", []);
      actuales.splice(btn.getAttribute("data-borrar"), 1);
      guardarDato("vitalis_objetivos", actuales);
      dibujarObjetivos();
      actualizarResumen();
    });
  });
}

/* US-28: Bitácora de logros */
document.getElementById("btn-agregar-logro").addEventListener("click", function () {
  const texto = document.getElementById("nuevo-logro").value.trim();
  if (texto === "") return;
  const logros = leerDato("vitalis_logros", []);
  logros.push({ texto: texto, fecha: new Date().toLocaleDateString() });
  guardarDato("vitalis_logros", logros);
  document.getElementById("nuevo-logro").value = "";
  dibujarLogros();
});

function dibujarLogros() {
  const logros = leerDato("vitalis_logros", []);
  const lista = document.getElementById("lista-logros");
  lista.innerHTML = "";
  logros.forEach(function (logro) {
    const li = document.createElement("li");
    li.innerHTML = "<span>" + logro.fecha + " — " + logro.texto + "</span>";
    lista.appendChild(li);
  });
}


/* ===========================================================
   SECCIÓN: ASISTENTE IA
   US-07, US-08, US-09, US-31, US-32, US-33
=========================================================== */

/* US-07: Desglose de proyectos con IA (simulado con reglas simples) */
document.getElementById("btn-desglosar").addEventListener("click", function () {
  const proyecto = document.getElementById("proyecto-grande").value.trim();
  if (proyecto === "") return;

  const pasos = [
    "Definir el objetivo específico de: " + proyecto,
    "Buscar información o recursos necesarios",
    "Hacer un primer borrador o avance pequeño",
    "Revisar y corregir el avance",
    "Terminar la versión final y entregar"
  ];

  const lista = document.getElementById("lista-desglose");
  lista.innerHTML = "";
  pasos.forEach(function (paso) {
    const li = document.createElement("li");
    li.innerHTML = '<input type="checkbox"> <span>' + paso + '</span>';
    lista.appendChild(li);
  });
});

/* US-08: Dictado de tareas por voz (Web Speech API) */
document.getElementById("btn-dictar").addEventListener("click", function () {
  const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!Reconocimiento) {
    document.getElementById("texto-dictado").value = "Tu navegador no soporta dictado por voz.";
    return;
  }

  const reconocimiento = new Reconocimiento();
  reconocimiento.lang = "es-ES";
  reconocimiento.start();

  reconocimiento.onresult = function (evento) {
    const texto = evento.results[0][0].transcript;
    document.getElementById("texto-dictado").value = texto;
  };

  reconocimiento.onerror = function () {
    document.getElementById("texto-dictado").value = "No se pudo reconocer el audio. Intenta de nuevo.";
  };
});

/* US-09: Filtrado de tareas por nivel de energía */
document.getElementById("btn-filtrar-energia").addEventListener("click", function () {
  const energia = document.getElementById("select-energia").value;
  const tareas = leerDato("vitalis_tareas", []).filter(function (t) { return !t.hecha; });
  let sugeridas = [];

  if (energia === "baja") {
    sugeridas = tareas.filter(function (t) { return t.prioridad === "baja"; });
  } else if (energia === "media") {
    sugeridas = tareas.filter(function (t) { return t.prioridad !== "alta"; });
  } else {
    sugeridas = tareas;
  }

  const lista = document.getElementById("lista-energia");
  lista.innerHTML = "";

  if (sugeridas.length === 0) {
    lista.innerHTML = "<li>No hay tareas pendientes que coincidan con tu energía actual.</li>";
    return;
  }

  sugeridas.forEach(function (t) {
    const li = document.createElement("li");
    li.innerHTML = "<span>" + t.texto + " (" + t.prioridad + ")</span>";
    lista.appendChild(li);
  });
});

/* US-31 / US-32 / US-33: Recomendaciones personalizadas */
const recomendaciones = [
  "Tómate 5 minutos para estirarte antes de seguir trabajando.",
  "Bebe un vaso de agua, la hidratación mejora tu concentración.",
  "Organiza tu próxima hora en bloques de 25 minutos con descansos.",
  "Escribe una cosa por la que estés agradecido hoy.",
  "Sal a caminar unos minutos si puedes, ayuda a bajar el estrés.",
  "Antes de dormir evita pantallas al menos 20 minutos.",
  "Prioriza solo 3 tareas importantes para hoy, no más."
];

document.getElementById("btn-recomendacion").addEventListener("click", function () {
  const estres = leerDato("vitalis_estres_hoy", 0);
  let texto = recomendaciones[Math.floor(Math.random() * recomendaciones.length)];

  if (estres >= 7) {
    texto = "Notamos que tu estrés es alto: " + texto;
  }

  document.getElementById("resultado-recomendacion").textContent = texto;
});


/* ===========================================================
   SECCIÓN: BIENESTAR FÍSICO
   US-15, US-16, US-20, US-34, US-44, US-45
=========================================================== */

/* US-15: Pausa activa (temporizador 2 minutos) */
let pausaSegundos = 120;
let pausaIntervalo = null;

document.getElementById("btn-pausa-iniciar").addEventListener("click", function () {
  if (pausaIntervalo) return;
  pausaSegundos = 120;

  pausaIntervalo = setInterval(function () {
    pausaSegundos--;
    const minutos = Math.floor(pausaSegundos / 60);
    const segundos = pausaSegundos % 60;
    document.getElementById("pausa-reloj").textContent =
      String(minutos).padStart(2, "0") + ":" + String(segundos).padStart(2, "0");

    if (pausaSegundos <= 0) {
      clearInterval(pausaIntervalo);
      pausaIntervalo = null;
      mostrarAlerta("Pausa activa completada. ¡Bien hecho!", "fa-circle-check");
      document.getElementById("pausa-reloj").textContent = "02:00";
    }
  }, 1000);
});

/* US-16: Respiración guiada (animación simple) */
let respirarIntervalo = null;
document.getElementById("btn-respirar-iniciar").addEventListener("click", function () {
  const circulo = document.getElementById("circulo-respiracion");
  let inhalando = true;
  circulo.textContent = "Inhala...";
  circulo.classList.add("inhalar");

  respirarIntervalo = setInterval(function () {
    inhalando = !inhalando;
    if (inhalando) {
      circulo.textContent = "Inhala...";
      circulo.classList.add("inhalar");
      circulo.classList.remove("exhalar");
    } else {
      circulo.textContent = "Exhala...";
      circulo.classList.add("exhalar");
      circulo.classList.remove("inhalar");
    }
  }, 4000);
});

document.getElementById("btn-respirar-detener").addEventListener("click", function () {
  clearInterval(respirarIntervalo);
  const circulo = document.getElementById("circulo-respiracion");
  circulo.textContent = "Respira";
  circulo.classList.remove("inhalar", "exhalar");
});

/* US-20: Tips de bienestar */
const tipsBienestar = [
  "Dormir al menos 7 horas mejora tu memoria y tu ánimo.",
  "Una breve caminata al aire libre reduce la ansiedad.",
  "Comer a horas regulares ayuda a mantener tu energía estable.",
  "Reír, aunque sea viendo un video corto, reduce el estrés.",
  "Escuchar música relajante puede bajar tu ritmo cardíaco."
];

document.getElementById("btn-tip").addEventListener("click", function () {
  document.getElementById("tip-bienestar").textContent =
    tipsBienestar[Math.floor(Math.random() * tipsBienestar.length)];
});

/* US-44: Tiempo de pantalla en la sesión */
let segundosPantalla = 0;
function iniciarTiempoPantalla() {
  setInterval(function () {
    segundosPantalla++;
    document.getElementById("tiempo-pantalla").textContent = Math.floor(segundosPantalla / 60);
  }, 1000);
}

/* US-45: Modo concentración */
document.getElementById("check-modo-concentracion").addEventListener("change", function () {
  document.body.classList.toggle("modo-concentracion", this.checked);
});


/* ===========================================================
   SECCIÓN: REPORTES
   US-36, US-37
=========================================================== */
document.getElementById("btn-generar-reporte").addEventListener("click", function () {
  const historialEstres = leerDato("vitalis_historial_estres", []);
  const promedioEstres = historialEstres.length
    ? (historialEstres.reduce(function (a, b) { return a + b; }, 0) / historialEstres.length).toFixed(1)
    : "Sin datos";

  const sueno = leerDato("vitalis_sueno_hoy", "Sin datos");
  const mood = leerDato("vitalis_mood_hoy", "Sin datos");
  const tareas = leerDato("vitalis_tareas", []);
  const tareasHechas = tareas.filter(function (t) { return t.hecha; }).length;

  const texto =
    "REPORTE DE BIENESTAR - VITALIS\n" +
    "Fecha: " + new Date().toLocaleDateString() + "\n\n" +
    "Ánimo más reciente: " + mood + "\n" +
    "Promedio de estrés (últimos registros): " + promedioEstres + "/10\n" +
    "Horas de sueño registradas: " + sueno + "\n" +
    "Tareas completadas: " + tareasHechas + " de " + tareas.length + "\n\n" +
    "Este reporte fue generado automáticamente por VITALIS.";

  document.getElementById("reporte-texto").textContent = texto;

  /* US-37: preparar enlace de correo con el reporte */
  const asunto = encodeURIComponent("Reporte de bienestar - VITALIS");
  const cuerpo = encodeURIComponent(texto);
  document.getElementById("btn-enviar-reporte").setAttribute(
    "href", "mailto:?subject=" + asunto + "&body=" + cuerpo
  );
});

document.getElementById("btn-copiar-reporte").addEventListener("click", function () {
  const texto = document.getElementById("reporte-texto").textContent;
  navigator.clipboard.writeText(texto).then(function () {
    mostrarAlerta("Reporte copiado al portapapeles.");
  });
});


/* ===========================================================
   SECCIÓN: CONFIGURACIÓN
   US-42, US-48
=========================================================== */
document.querySelectorAll("[data-tamano]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const tamano = btn.getAttribute("data-tamano");
    document.body.classList.toggle("tamano-grande", tamano === "grande");
  });
});


/* ===========================================================
   INICIO / RESUMEN
   US-35, US-40, US-43, US-46
=========================================================== */
function actualizarResumen() {
  const tareas = leerDato("vitalis_tareas", []);
  const tareasHechas = tareas.filter(function (t) { return t.hecha; }).length;
  document.getElementById("resumen-tareas").textContent = tareasHechas;

  document.getElementById("resumen-animo").textContent = leerDato("vitalis_mood_hoy", "--");
  document.getElementById("resumen-sueno").textContent = leerDato("vitalis_sueno_hoy", "--") + " h";
  document.getElementById("resumen-estres").textContent = leerDato("vitalis_estres_hoy", "--");

  /* Progreso académico: basado en objetivos */
  const objetivos = leerDato("vitalis_objetivos", []);
  const objetivosHechos = objetivos.filter(function (o) { return o.hecho; }).length;
  const pctAcademico = objetivos.length ? Math.round((objetivosHechos / objetivos.length) * 100) : 0;
  document.getElementById("barra-academico").style.width = pctAcademico + "%";
  document.getElementById("texto-academico").textContent = pctAcademico + "% de tus objetivos completados";

  /* Progreso de hábitos: basado en metas */
  const metas = leerDato("vitalis_metas", []);
  const metasHechas = metas.filter(function (m) { return m.hecha; }).length;
  const pctHabitos = metas.length ? Math.round((metasHechas / metas.length) * 100) : 0;
  document.getElementById("barra-habitos").style.width = pctHabitos + "%";
  document.getElementById("texto-habitos").textContent = pctHabitos + "% de tus metas completadas";
}

/* US-46: Frases motivacionales */
const frasesMotivacionales = [
  "Un paso pequeño hoy es mejor que ningún paso.",
  "La disciplina es elegir entre lo que quieres ahora y lo que más quieres.",
  "Tu bienestar también es una prioridad, no solo tus tareas.",
  "Progreso, no perfección.",
  "Respira. Ya has avanzado más de lo que crees."
];

document.getElementById("btn-frase").addEventListener("click", function () {
  document.getElementById("frase-motivacional").textContent =
    frasesMotivacionales[Math.floor(Math.random() * frasesMotivacionales.length)];
});


/* ---------------------------------------------------------
   6. CARGA INICIAL DE LISTAS AL ABRIR LA APP
--------------------------------------------------------- */
dibujarMetas();
dibujarTareas();
dibujarHorarios();
dibujarExamenes();
dibujarObjetivos();
dibujarLogros();
dibujarHistorialEstres(leerDato("vitalis_historial_estres", []));