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
  function displayCity(cities) {
    if (cities === 0) {
      cityContainer.textContent = 'No se encontro la ciudad.';
      return;
  }
  
  //Crear elementos para informacion clima actual
  
  var cityN=document.createElement('h4');
    cityN.setAttribute('class','p-0 m-0 font-weight-bold');
  
  var pTemp =document.createElement('p');
    pTemp.setAttribute('class','my-1');
  var pWind =document.createElement('p');
    pWind.setAttribute('class','my-1');
  var pHumidity =document.createElement('p');
    pHumidity.setAttribute('class','my-1');
  
  
  //Tomar informacion de la api para clima actual
  cityname=cities.city.name;
  var date = new Date(cities.list[0].dt*1000);
    var day= date.getDate();
    var month= date.getMonth();
    var year= date.getFullYear();
    
  var wIcon=cities.list[0].weather[0].icon;
  var crteImg=document.createElement('img');
    crteImg.setAttribute("style","width:45px")
    crteImg.setAttribute("src","http://openweathermap.org/img/wn/"+wIcon+"@2x.png");
    
    cityN.textContent=cityname + " (" + month + "/" + day + "/" + year + ") ";
  
  //Agregar informacion a los elementos creados 
  pTemp.textContent="Temp: "+cities.list[0].main.temp +" °F";
  pWind.textContent="Wind: "+cities.list[0].wind.speed + " MPH";
  pHumidity.textContent="Humidity: "+cities.list[0].main.humidity +" %";
  
  //Agregar elementos al html
  cityContainer.appendChild(cityN);
    cityN.append(crteImg);
    cityContainer.appendChild(pTemp);
    cityContainer.appendChild(pWind);
    cityContainer.appendChild(pHumidity);

  //5 days weather
  fivedayEl.classList.remove("d-none");
  
    for(var i=0; i<5; i++){
      //fecha con un dia despues del actaul
      var forecastindex=((i+1)*8)-1;
      //Cear cards con elementos para informacion
      var divR=document.createElement('div');
        divR.setAttribute('class','col-md-2 forecast bg-dark text-white m-2 rounded');
      var tdate=document.createElement('h4');
        cityN.setAttribute('class','p-0 m-0 font-weight-normal');
      var pTemp2 =document.createElement('p');
        pTemp.setAttribute('class','my-1');
      var pWind2 =document.createElement('p');
        pWind.setAttribute('class','my-1');
      var pHumidity2 =document.createElement('p');
        pHumidity.setAttribute('class','my-1');
  
      var forecastdate = new Date(cities.list[forecastindex].dt*1000);
      var forecastday= forecastdate.getDate();
      var forecastmonth= forecastdate.getMonth();
      var forecastyear= forecastdate.getFullYear();
  
      var wIcon2=cities.list[forecastindex].weather[0].icon;
      var crteImg2=document.createElement('img');
      crteImg2.setAttribute("style","width:70px")
      crteImg2.setAttribute("src","http://openweathermap.org/img/wn/"+wIcon2+"@2x.png");
  
      tdate.textContent = " (" + forecastmonth + "/" + forecastday + "/" + forecastyear + ") ";
      pTemp2.textContent="Temp: "+cities.list[forecastindex].main.temp +" °F";
      pWind2.textContent="Wind: "+cities.list[forecastindex].wind.speed + " MPH";
      pHumidity2.textContent="Humidity: "+cities.list[forecastindex].main.humidity +" %";
  
      dayForecast.appendChild(divR);
      divR.appendChild(tdate);
      divR.appendChild(crteImg2);
      divR.appendChild(pTemp2);
      divR.appendChild(pWind2);
      divR.appendChild(pHumidity2); 
    }
  }
