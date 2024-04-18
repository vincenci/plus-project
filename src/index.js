
function changeWeather(response){
  let temperature=document.querySelector("#temperature-value") ;
let cityElement=document.querySelector("#city");
 let descriptionElement=document.querySelector("#description");
let humidityElement=document.querySelector("#humidity");
let windElement=document.querySelector("#windspeed")
let timeElement=document.querySelector("#time")
let currentDate=new Date(response.data.time)
let iconElement=document.querySelector("#icon");

iconElement.innerHTML=`<img src=${response.data.condition.icon_url} alt="icons" class="weather-app-icon">`
timeElement.innerHTML=formatDate(currentDate);
windElement.innerHTML=Math.round(response.data.wind.speed);
humidityElement.innerHTML=response.data.temperature.humidity; 
descriptionElement.innerHTML=response.data.condition.description;
cityElement.innerHTML=response.data.city;
temperature.innerHTML=Math.round(response.data.temperature.current);
getForecast(response.data.city);

}

function formatDate(currentDate){
    
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",]
    let day= days[currentDate.getDay()];
    let date= currentDate.getDate();
    let hours=currentDate.getHours()
    if( hours<10){
        hours=`0${hours}`;
    }
    let minutes=currentDate.getMinutes();
    if(minutes<10){
        minutes=`0${minutes}`;
    }
    return `${day} ${date} ${hours}:${minutes}`

}


function searchCity(myCity){
let apiKey="4b80ffa1514bb3fdcc613oata4f03d95";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${myCity}&key=${apiKey}`;
axios.get(apiUrl).then(changeWeather);

}

function handleSearch(){
    event.preventDefault();
  let searchCityElement=document.querySelector("#city-input");
    
    searchCity(searchCityElement.value);
}
function getForecast(myCity){
  let apiKey="4b80ffa1514bb3fdcc613oata4f03d95";
  let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${myCity}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(weatherForecast);
}
function formatDay(timestamp){
  let days=["Wed","Thur","Fri","Sat","Sun","Mon","Tue"];
   let date = new Date(timestamp * 1000);
   return days[date.getDay()]
}
function weatherForecast(response){
  console.log(response.data);

let forecastHtml="";
response.data.daily.forEach(function(day,index) {
  if(index<5){
  forecastHtml=forecastHtml + 
  `<div class="weather-forecast-details">
                    <div class=" forecast-day">${formatDay(day.time)}
                    </div>
                    <div class="forecast-icon"> <img src="${day.condition.icon_url}"/>
                    </div>
                    <div class= forecast-temperatures>
                        <strong><span class="forecast-temperature-max">${Math.round(day.temperature.maximum)}°
                        </span></strong>  
                        <strong><span class="forecast-temperature-min">${Math.round(day.temperature.minimum)}°
                        </span> </strong>
                        </div>
                </div>`
}});
let weatherForecastElement=document.querySelector("#weather-forecast")
weatherForecastElement.innerHTML= forecastHtml;
}


let searchForm=document.querySelector("#search-form");
searchForm.addEventListener("submit",handleSearch);
searchCity("paris");

