// Variables globales con la URL base de la API y la clave de API
let urlBase = 'https://api.openweathermap.org/data/2.5/weather'; //URL base de la API OpenWeatherMap
let api_key = "84b0ebfa396c542b5cb57a427f26fbe8"; // Tu clave de API de OpenWeatherMap
let difKelvin = 273.15; // Diferencia entre Kelvin y Celsius
let urlBaseIcon = 'https://openweathermap.org/img/wn/'; // URL base para los iconos del clima

// Añadir un event listener al botón de búsqueda
document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value;
    
    if(ciudad) {
        fetchDatosClima(ciudad);
    }
});

// Función para obtener los datos del clima de la ciudad usando la API
function fetchDatosClima(ciudad) {
    // Realizamos una solicitud a la API de OpenWeatherMap usando fetch
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
        .then(data => data.json()) 
        .then(data => mostrarDatosClima(data)); 
}

// Función para mostrar los datos del clima en la interfaz
function mostrarDatosClima(data) {
    // Obtener el contenedor de los datos del clima
    const divDatosClima = document.getElementById('datosClima');

    // Limpiar el contenedor antes de agregar nuevos datos
    divDatosClima.innerHTML = '';

    // Obtener los datos relevantes de la respuesta de la API
    const ciudadNombre = data.name; // Nombre de la ciudad
    const paisNombre = data.sys.country; // Código del país
    const temperatura = data.main.temp; // Temperatura en Kelvin
    const humedad = data.main.humidity; // Porcentaje de humedad
    const iconTemp = data.weather[0].icon; // Icono del clima
    const description = data.weather[0].description; // Descripción del clima

    // Crear elementos HTML para mostrar los datos
    const paisTitulo = document.createElement('h2');
    paisTitulo.textContent = `${ciudadNombre}, ${paisNombre}`; // Mostrar el nombre de la ciudad y país

    const humedadInfo = document.createElement('p');
    humedadInfo.textContent = `La humedad es: ${humedad}%`; // Mostrar la humedad

    const iconClima = document.createElement('img');
    iconClima.src = `${urlBaseIcon}${iconTemp}@2x.png`; // Mostrar el icono del clima

    const temperaturaInfo = document.createElement('p');
    temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura - difKelvin)} C°`; // Convertir la temperatura de Kelvin a Celsius y mostrarla

    const descripcionInfo = document.createElement('p');
    descripcionInfo.textContent = `La descripcion meteorológica es: ${description}`; // Descripción del clima

    // Agregar los elementos al contenedor de datos del clima
    divDatosClima.appendChild(paisTitulo);
    divDatosClima.appendChild(temperaturaInfo);
    divDatosClima.appendChild(humedadInfo);
    divDatosClima.appendChild(iconClima);
    divDatosClima.appendChild(descripcionInfo);
}
