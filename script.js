let appId = 'cba7a255ceadaa690d0b878dca523e08';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm){
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then(result => {

            if (!result.ok) {

                throw new Error('Error! Please enter a valid city name');
            
            }   
            
            return result.json();
            
        
        })
        .then(result => {

            init(result);
        
        })
        .catch(error => {
            displayError(error.message); 
          
        });
       
         
}
function displayError(errorMessage) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    setTimeout(() => {
        errorElement.style.display = 'none';

    },3000) 
}


    function init(resultFromServer){
        switch (resultFromServer.weather[0].main){
            case "Clear":
                document.body.style.backgroundImage = 'url("./photos/clear.jpg")';
                break;

            case "Clouds":
                document.body.style.backgroundImage = 'url("./photos/cloudy.jpg")';

            break;

            case "Rain":
            case "Drizzle":
                document.body.style.backgroundImage = 'url("./photos/rain.jpg")';
        

            break;

            case "Thunderstorm":
                document.body.style.backgroundImage = 'url("./photos/storm.jpg")';

            break;
            
            case "Snow":
                document.body.style.backgroundImage = 'url("./photos/snow.jpg")';

            break;

            case "Mist":
                document.body.style.backgroundImage = 'url("./photos/mist.jpg")';

            break;

            default:
                break;
    
        }
        
        let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
        let temperatureElement = document.getElementById('temperature');
        let humidityElement = document.getElementById('humidity');
        let windSpeedElement = document.getElementById('windSpeed');
        let cityHeader = document.getElementById('cityHeader');
        let weatherIcon = document.getElementById('documentIconImg');

        weatherIcon.src = 'https://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

        let resultDescription = resultFromServer.weather[0].description;
        weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

        temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
        windSpeedElement.innerHTML = 'Wind speed = ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
        cityHeader.innerHTML = resultFromServer.name;
        humidityElement.innerHTML = 'Humidity = ' + resultFromServer.main.humidity + '%';

        setPositionForWeatherInfo();
        console.log(resultFromServer);
        
    }

    function setPositionForWeatherInfo(){
        let weatherContainer = document.getElementById('weatherContainer')
        let weatherContainerHeight = weatherContainer.clientHeight;
        let weatherContainerWidth = weatherContainer.clientWidth;

        weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
        weatherContainer.style.top = `calc(50% - ${weatherContainerWidth/1.3}px)`;
        weatherContainer.style.visibility = 'visible';
    }

    document.getElementById('searchBtn').addEventListener('click', () => {
        let searchTerm = document.getElementById('searchInput').value;
        if(searchTerm)
            searchWeather(searchTerm);
    })

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        hideMainText();
        searchWeather(searchTerm);
    }
});

function hideMainText() {
    const mainText = document.getElementById('mainText');
    mainText.style.display = 'none';
}

document.getElementById('celsiusBtn').addEventListener('click', () => {
    units = 'metric'; 
    updateTemperatureDisplay();
});

document.getElementById('fahrenheitBtn').addEventListener('click', () => {
    units = 'imperial'; 
    updateTemperatureDisplay();
});

function updateTemperatureDisplay() {
    if (resultFromServer) {
        if (units === 'metric') {
            temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;C';
       
       
        } else if (units === 'imperial') {
            
            
            const fahrenheitTemp = Math.floor((resultFromServer.main.temp * 9/5) + 32);
            temperatureElement.innerHTML = fahrenheitTemp + '&#176;F';
            
        }
    }

}

updateTemperatureDisplay();


    