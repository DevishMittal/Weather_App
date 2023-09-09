let appId = 'cba7a255ceadaa690d0b878dca523e08';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm){
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();

    }).then(result =>  {
        init(result);
        
    })
}
    function init(resultFromServer){
        switch (resultFromServer.weather[0].main){
            case 'Clear':
                document.body.style.backgroundImage = 'url("clear.jpg")'

            break;

            case 'Clouds':
                document.body.style.backgroundImage = 'url("cloudy.jpg")'

            break;

            case 'Rain':
            case 'Drizzle':
                document.body.style.backgroundImage = 'url("rain.jpg")'
        

            break;

            case 'Thunderstorm':
                document.body.style.backgroundImage = 'url("storm.jpg")'

            break;
            
            case 'Snow':
                document.body.style.backgroundImage = 'url("snow.jpg")'

            break;

            case 'Mist':
                document.body.style.backgroundImage = 'url("mist.jpg")'

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
        

        
    }
    document.getElementById('searchBtn').addEventListener('click', () => {
        let searchTerm = document.getElementById('searchInput').value;
        if(searchTerm)
            searchWeather(searchTerm);
    })

