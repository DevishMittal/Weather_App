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
        console.log(resultFromServer);
        
    }
    document.getElementById('searchBtn').addEventListener('click', () => {
        let searchTerm = document.getElementById('searchInput').value;
        if(searchTerm)
            searchWeather(searchTerm);
    })

