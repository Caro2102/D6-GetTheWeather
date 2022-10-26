var userBtn = document.querySelector('#btn-user');
var nameInputEl = document.querySelector('#cityname');
var liContainer = document.querySelector('#card-search');
var cityForm = document.querySelector('#cityForm');
var cityContainer = document.querySelector('#city-container');
var fivedayEl =document.querySelector('#fiveday-header');
var dayForecast = document.querySelector('#day-forecast');
var APIKey= "c34e5300156b6ed973d2421c25421b56";
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
citySearch();
btn();
//Solicitar respuesta de API
function getWeather(citynames){
  cityContainer.classList.remove("d-none");
  cityContainer.textContent = '';
    dayForecast.textContent='';
    nameInputEl.value='';
    var queryURL="https://api.openweathermap.org/data/2.5/forecast?q="+citynames+"&appid=" + APIKey +"&units=imperial";
    fetch(queryURL)
    .then(function (response){
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayCity(data, citynames);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect ');
    });
  }
