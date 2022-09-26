"use strict";

//DOM SELECTION
const cityName = document.querySelectorAll(".location");
const windSpeed = document.getElementById("wind-speed");
const airPreesure = document.getElementById("air-pressure");
const temperature = document.getElementById("temperature");
const weather = document.getElementById("weather");
const humidity = document.getElementById("humidity");
const humidityBar = document.getElementById("bar-content");
const nextDayTemp = document.querySelectorAll(".temp-next-day");
const picPlaces = document.querySelectorAll(".weather-sm-pic");
const lgImg = document.querySelector(".lg-image img");
const countryName = document.getElementById('country-name');
//
function fetchData() {
  let searchData = document.getElementById("search-data").value;
  (searchData.length === 0 ? searchData = 'Jakarta' : '' );
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=f70f0c8d9cddb4dd2761bb28d1e9bbc7`
  );
  request.send();
  request.addEventListener("load", function () {
      const data = JSON.parse(this.responseText);
      if(data.cod == 404) {
        alert('City not found');
        return 0;
      }
      const  countryCode = data.sys.country;
      console.log(data);

    cityName.forEach(function (item) {
      item.innerText = data.name;
    });
    windSpeed.innerText = data.wind.speed;
    airPreesure.innerText = `${data.main.pressure} hPa`;
    temperature.innerHTML = `${(data.main.temp - 273.15).toFixed(1)} &#8451;`;
    weather.innerText = data.weather[0].main;
    humidity.innerHTML = `${data.main.humidity}%`;
    humidityBar.style.width = `${data.main.humidity}%`;
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    //Temperature
    const request2 = new XMLHttpRequest();
    request2.open(
      "GET",
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&hourly=temperature_2m`
    );
    request2.send();

    request2.addEventListener("load", function () {
      const tempArr = [];
      const data = JSON.parse(this.responseText);
      nextDayTemp.forEach(function (item) {
        tempArr.push(item);
      });
      console.log(data.hourly.temperature_2m);
      for (let i = 1; i <= 4; ++i) {
        tempArr[i - 1].innerHTML = `${
          data.hourly.temperature_2m[i * 24]
        }<span>&#8451;</span>`;
      }
    });

    //Weather
    const request3 = new XMLHttpRequest();
    request3.open(
      "GET",
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&daily=weathercode`
    );
    request3.send();

    request3.addEventListener("load", function () {
      const picsNameArr = [];
      const data = JSON.parse(this.responseText);
      console.log(data.daily.weathercode);

      for (let i = 0; i <= 4; ++i) {
        switch (data.daily.weathercode[i]) {
          case 0:
            picsNameArr.push("0.svg");
            break;
          case 1:
          case 2:
          case 3:
            picsNameArr.push("1-3.svg");
            break;
          case 45:
          case 48:
            picsNameArr.push("45-48-.svg");
            break;
          case 51:
          case 53:
          case 55:
            picsNameArr.push("51,53,55.svg");
            break;
          case 56:
          case 57:
            picsNameArr.push("66,77.svg");
            break;
          case 61:
          case 63:
          case 65:
            picsNameArr.push("61,63,65.svg");
            break;
          case 66:
          case 67:
            picsNameArr.push("66,77");
            break;
          case 71:
          case 73:
          case 75:
            picsNameArr.push("71,73,75.svg");
            break;
          case 77:
            picsNameArr.push("77.svg");
            break;
          case 80:
          case 81:
          case 82:
            picsNameArr.push("80,81,82.svg");
            break;
          case 85:
          case 86:
            picsNameArr.push("85,86.svg");
            break;
          case 95:
          case 96:
          case 99:
            picsNameArr.push("95-99.svg");
            break;
          default:
            break;
        }

        if (i == 0) {
          lgImg.src = `/images/animated/${picsNameArr[i]}`;
        } else {
          picPlaces[i - 1].src = `/images/animated/${picsNameArr[i]}`;
        }
      }
      console.log(picPlaces);
    });
 
    const reqCountryName = new XMLHttpRequest();
    reqCountryName.open('GET', `https://restcountries.com/v2/alpha/${countryCode}`);
    reqCountryName.send();

    reqCountryName.addEventListener('load', function() {
        const data = JSON.parse(this.responseText);
        console.log(data);
        countryName.innerText = data.name;
    });

});


};

fetchData();

//I promise will learn promise!.
