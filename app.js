//Llave de la API para mandarla a llamar
const API_KEY = '226e4aff5d4b9ed3e485f8ebb6ce4702';

//Recibir los datos de la posicion del usuario
const fetchData = position => {
    //obtener longitud y latitud de los usuarios
    const { latitude, longitude } = position.coords;
    //Hacer la llamada de la API
    fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())//obtiene una respuesta
        .then(data => setWeatherData(data));//utilizar la data
}

//FUNCIÓN ENVIAR DATOS DEL CLIMA
const setWeatherData = data => {
    console.log(data);
    const weatherData = { //En esta constante vamos a guardar toda la información
        location: data.name, //Localizacion
        description: data.weather[0].main, //descripcion
        humidity: data.main.humidity, //humedad
        pressure: data.main.pressure, //presion
        temperature: data.main.temp,//temperatura
        date: getDate(), //fecha
    }
    //Creamos un objeto donde se recorre todos los objetos y devuelve las keys
    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];//enviamos la info al html
    });

    cleanUp();
}

//FUNCIÓN cleanUP
//funcion para el spinner
const cleanUp = () => {
    let container = document.getElementById('container');
    let loader = document.getElementById('loader');

    loader.style.display = 'none'; 
    container.style.display = 'flex';//cuando termine se mostrará la info
}

//FUNCIÓN OBTENER FECHA
const getDate = () => {
    let date = new Date(); //variable date donde se obtendra
    //enviar el dia, mes y año
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

//Funcion onLoad para ubicacion del usuario.
const onLoad = ()  => {
    navigator.geolocation.getCurrentPosition(fetchData);
}