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


function getCurrentWeather(lat, long) { // calls API and receives data as JSON, then displays data
  const url = `${BASE_URL}onecall?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`;

  axios.get(url)
    .then(response => {
      const weather = response.data;
      console.log(`Temperature: ${weather.current.temp}°F`);
      console.log(`Feels Like: ${weather.current.feels_like}°F`);
      start();
    })
    .catch(error => {
      console.log('\nError fetching weather data:', error.message);
      askForZipcode(getCurrentWeather); // Prompt the user again
    });
}

module.exports = { askForZipcode, getLatLong, getCurrentWeather };
