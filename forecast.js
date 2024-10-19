const readline = require('readline');
const axios = require('axios');

const API_KEY = '87b6625228345f0eb1666245b6367663'; 
const BASE_URL = 'http://api.openweathermap.org/data/3.0/';

const GEO_URL = 'http://api.openweathermap.org/geo/1.0/zip';




function askForZipcode(callback) {
  rl.question('What is the zipcode? ', (answer) => {
    if (/^\d{5}$/.test(answer)) {
      getLatLong(answer, callback);
    } else {
      console.log('Invalid zipcode. Please enter a 5-digit zipcode.');
      askForZipcode(callback); // Prompt the user again
    }
  });
}


function getLatLong(zipcode, callback) { // converts zipcode to latitude and longitude needed for API call
  const latLongUrl = `${GEO_URL}?zip=${zipcode},US&appid=${API_KEY}`;

  axios.get(latLongUrl)
    .then(response => {
      const location = response.data;
      const lat = location.lat; 
      const lon = location.lon;
      callback(lat, lon); // Call the callback with lat and lon
    })
    .catch(error => {
      console.error('Error fetching location data:', error);
    });
}


function getWeatherForecast(lat, lon) {
  const url = `${BASE_URL}onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  return axios.get(url)
    .then(response => {
      const weather = response.data;
      const dailyForecasts = weather.daily.map((day, index) => ({
        day: `Day ${index + 1}`,
        maxTemp: `${day.temp.max}°F`,
        minTemp: `${day.temp.min}°F`,
        summary: day.weather[0].description,
      }));
      return dailyForecasts;
    })
    .catch(error => {
      throw new Error('Error fetching weather data');
    });
}

module.exports = { askForZipcode, getLatLong, getWeatherForecast };
