const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const API_KEY = '87b6625228345f0eb1666245b6367663'; 
const BASE_URL = 'http://api.openweathermap.org/data/3.0/';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/zip';


function start() {
  console.log('\nMenu');
  console.log('1. Get Current Weather');
  console.log('2. Get 8-Day Forecast');
  console.log('3. Exit\n');
  rl.question('What do you want? ', (answer) => {
    if (answer === '1' || answer === '2' || answer === '3') {
      handleMenuSelection(answer);
    } else {
      console.log('Invalid selection. Please enter 1, 2, or 3.');
      start(); // Prompt the user again
    }
  });
}


function handleMenuSelection(selection) {
  switch (selection) {
    case '1':
      askForZipcode(getCurrentWeather);
      break;
    case '2':
      askForZipcode(getWeatherForecast);
      break;
    case '3':
      console.log('Goodbye!\n');
      rl.close();
      break;
  }
}


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
      const long = location.lon;
      // console.log(`Latitude: ${lat}, Longitude: ${long}`); // Debugging log
      console.log(''); // space to make output easier to read
      callback(lat, long); // Call the callback with lat and long
    })
    .catch(error => {
      console.log('\nError fetching location data:', error.message);
      askForZipcode(callback); // Prompt the user again
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


function getWeatherForecast(lat, long) { // calls API and receives data as JSON, puts data in an array
  const url = `${BASE_URL}onecall?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`;

  axios.get(url)
    .then(response => {
      const weather = response.data;
      console.log('8-Day Weather Forecast\n');
      const dailyForecasts = weather.daily.map((day, index) => ({ // Native Array ES6 function transforms data
        day: `Day ${index + 1}`,
        maxTemp: `${day.temp.max}°F`,
        minTemp: `${day.temp.min}°F`,
        summary: day.summary,
      }));

      dailyForecasts.forEach(forecast => { // uses more concise code to display data (compared to getCurrentWeather)
        console.log(forecast.day);
        console.log(`Max Temp: ${forecast.maxTemp}`);
        console.log(`Min Temp: ${forecast.minTemp}`);
        console.log(`Summary: ${forecast.summary}`);
        console.log('-------------------------');
      });
      start();
    })
    .catch(error => {
      console.log('\nError fetching weather data:', error.message);
      askForZipcode(getWeatherForecast); // Prompt the user again
    });
}


start();