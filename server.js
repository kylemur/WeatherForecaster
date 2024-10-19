const express = require('express');
const path = require('path');
const axios = require('axios');
const { getWeatherForecast } = require('./forecast'); // Import the function

const app = express();

// Use PORT environment variable if available, otherwise default to 8080
const PORT = process.env.PORT || 8080;
// const port = 3000;

const API_KEY = '87b6625228345f0eb1666245b6367663'; 
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/zip';
const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the home.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/getLatLong', (req, res) => {
  const zipcode = req.query.zipcode;
  const latLongUrl = `${GEO_URL}?zip=${zipcode},US&appid=${API_KEY}`;

  axios.get(latLongUrl)
    .then(response => {
      const location = response.data;
      const lat = location.lat; 
      const lon = location.lon;
      res.json({ lat, lon });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error fetching location data' });
    });
});

app.get('/getCurrentWeather', (req, res) => {
  const { lat, lon } = req.query;
  const weatherUrl = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  axios.get(weatherUrl)
    .then(response => {
      const weather = response.data;
      const description = weather.weather[0].description;
      res.json({ description });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error fetching weather data' });
    });
});

app.get('/getWeatherForecast', (req, res) => {
  const { lat, lon } = req.query;
  getWeatherForecast(lat, lon)
    .then(forecast => res.json(forecast))
    .catch(error => res.status(500).json({ error: 'Error fetching weather forecast' }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});