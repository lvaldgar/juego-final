document.addEventListener('DOMContentLoaded', function () {
  // Este evento se dispara cuando el contenido HTML del documento se ha cargado, lo que garantiza que el script se ejecute después de que la estructura de la página esté lista.

  const inicio = document.getElementById('inicio');
  const juego = document.getElementById('juego');
  const tablero = document.getElementById('tablero');
  const mensaje = document.getElementById('mensaje');
  const startButton = document.getElementById('start-button');
  // Aquí se obtienen referencias a varios elementos del DOM, permitiendo un fácil acceso y manipulación en el script.

  const animales = [
    'elefante', 'elefante',
    'raton', 'raton',
    'serpiente', 'serpiente',
    'vaca', 'vaca',
    'aguila', 'aguila',
    'pinguino', 'pinguino',
    'oso', 'oso',
    'ciervo', 'ciervo',
    'perro', 'perro',
    'tigre', 'tigre'
  ];
  // Una lista que contiene pares de animales. Cada animal aparece dos veces en el array.

  let cuadrosElegidos = [];
  let cuadrosCorrectos = [];
  let tiempoRestante = 60; // 1 minuto en segundos
  let intervaloTiempo;
  // Variables que almacenan el estado del juego, como los cuadros seleccionados, cuadros correctos y el tiempo restante.

  function iniciarJuego() {
    inicio.style.display = 'none';
    juego.style.display = 'block';

    mostrarTablero();
    setTimeout(function () {
      ocultarTablero();
    }, 20000);

    intervaloTiempo = setInterval(function () {
      tiempoRestante--;
      if (tiempoRestante <= 0) {
        clearInterval(intervaloTiempo);
        mostrarMensaje('¡Tiempo agotado! Intenta de nuevo.');
        reiniciarJuego();
      } 
    }, 1000);
  }
  // Esta función se llama al hacer clic en el botón de inicio. Oculta la sección de inicio, muestra el tablero con animales durante 20 segundos y luego oculta los animales. También inicia un temporizador.

  startButton.addEventListener('click', iniciarJuego);
  // Agrega un evento de clic al botón de inicio para que la función `iniciarJuego` se ejecute cuando se hace clic en el botón.

  function mostrarTablero() {
    animales.sort(() => Math.random() - 0.5);
    // Se utiliza el método `sort` para ordenar aleatoriamente la lista de animales. Esto asegura que cada vez que se inicia el juego, los animales se coloquen en diferentes posiciones.

    for (let i = 0; i < animales.length; i++) {
      const cuadro = document.createElement('div');
      cuadro.className = 'cuadro';
      cuadro.dataset.animal = animales[i];
      cuadro.textContent = cuadro.dataset.animal;
      cuadro.addEventListener('click', seleccionarCuadro);
      tablero.appendChild(cuadro);
    }
  }
  // Rellena el tablero con cuadros que contienen parejas de animales, de manera aleatoria.

  function ocultarTablero() {
    const cuadros = document.querySelectorAll('.cuadro');
    cuadros.forEach(cuadro => {
      cuadro.style.backgroundColor = 'orange';
      cuadro.textContent = '';
    });
  }
  // Oculta los animales en los cuadros después de los primeros 20 segundos.

  function habilitarInteraccion() {
    const cuadros = document.querySelectorAll('.cuadro');
    cuadros.forEach(cuadro => {
      cuadro.addEventListener('click', seleccionarCuadro);
    });
  }
  // Habilita la interacción del jugador al hacer clic en los cuadros. Esto se llama después de ocultar el tablero para permitir al jugador seleccionar cuadros.

  function seleccionarCuadro() {
    const cuadro = this;
    cuadro.style.backgroundColor = '#fff';
    cuadro.textContent = cuadro.dataset.animal;

    cuadrosElegidos.push({
      elemento: cuadro,
      animal: cuadro.dataset.animal
    });

    if (cuadrosElegidos.length === 2) {
      setTimeout(verificarPareja, 500);
    }
  }
  // Esta función se ejecuta cuando un cuadro es clicado. Muestra el animal en el cuadro y verifica si se han seleccionado dos cuadros.

  function verificarPareja() {
    const [cuadro1, cuadro2] = cuadrosElegidos;

    if (cuadro1.animal === cuadro2.animal) {
      cuadrosCorrectos.push(cuadro1, cuadro2);

      if (cuadrosCorrectos.length === animales.length) {
        clearInterval(intervaloTiempo);
        mostrarMensaje('¡Felicidades! Has encontrado todas las parejas.');
        reiniciarJuego();
      }
    } else {
      cuadro1.elemento.style.backgroundColor = 'orange';
      cuadro1.elemento.textContent = '';
      cuadro2.elemento.style.backgroundColor = 'orange';
      cuadro2.elemento.textContent = '';
    }

    cuadrosElegidos = [];
  }
  // Comprueba si los cuadros seleccionados forman una pareja (tienen el mismo animal) o no. Actualiza el estado del juego en consecuencia.

  function mostrarMensaje(texto) {
    mensaje.textContent = texto;
  }
  // Muestra un mensaje en la interfaz de usuario. Por ejemplo, "¡Felicidades! Has encontrado todas las parejas."

  function reiniciarJuego() {
    setTimeout(function () {
      inicio.style.display = 'block';
      juego.style.display = 'none';

      // Limpiar el tablero
      tablero.innerHTML = '';
      cuadrosElegidos = [];
      cuadrosCorrectos = [];
      tiempoRestante = 60;

      // Limpiar el mensaje
      mostrarMensaje('');

      // Detener el contador de tiempo si aún está en funcionamiento
      clearInterval(intervaloTiempo);
    }, 30000);
  }
  // Reinicia el juego después de un breve retraso. Restaura la interfaz de usuario, limpia el tablero y reinicia las variables de estado del juego.
});


  