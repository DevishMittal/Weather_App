let appId = "cba7a255ceadaa690d0b878dca523e08";
let units = "Metrics";
let Search_Method = 'zip';

function Search_Weather(SearchTerm){
    fetch(`https://api.openweathermap.org/data/2.5/weather?${Search_Method}=${SearchTerm}&APPID=$(appId)&units=$(units)`).then(result => {
        return result.json();

    }).then(result =>  {
        init(result);
        
    })
    function init(resultFromServer){
        console.log(resultFromServer);
        
    }
    document.getElementById('Search_Button')

}