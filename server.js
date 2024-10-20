const express = require('express');
const path = require('path');
const axios = require('axios');
const { getWeatherForecast } = require('./forecast'); // Import the function

const app = express();
const port = 3000;

const API_KEY = '87b6625228345f0eb1666245b6367663'; 
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/zip';
const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const MAIN_URL = 'http://api.openweathermap.org/data/3.0/onecall';

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
  const weatherUrl = `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  axios.get(weatherUrl)
    .then(response => {
      const weather = response.data;
      const description = weather.weather[0].description;
      const temperature = weather.main.temp;
      const feelsLike = weather.main.feels_like;
      const windSpeed = weather.wind.speed;
      res.json({ description, temperature, feelsLike, windSpeed });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error fetching current weather data' });
    });
});

app.get('/getDailyForecast', (req, res) => {
  const { lat, lon } = req.query;
  const dailyUrl = `${MAIN_URL}?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=imperial`;

  axios.get(dailyUrl)
    .then(response => {
      const dailyData = response.data.daily.slice(0, 8); // Get the next 8 days
      const dailyForecast = dailyData.map((day, index) => ({
        day: `Day ${index + 1}`,
        maxTemp: `${day.temp.max}°F`,
        minTemp: `${day.temp.min}°F`,
        windSpeed: `${day.wind_speed} mph`,
        precipitationProbability: `${day.pop * 100}%`,
        summary: day.weather[0].description,
      }));
      res.json(dailyForecast);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error fetching daily weather forecast' });
    });
});

app.get('/getHourlyForecast', (req, res) => {
  const { lat, lon } = req.query;
  const hourlyUrl = `${MAIN_URL}?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}&units=imperial`;

  axios.get(hourlyUrl)
    .then(response => {
      const hourlyData = response.data.hourly.slice(0, 24); // Get the next 24 hours
      const hourlyForecast = hourlyData.map((hour, index) => ({
        hour: `Hour ${index + 1}`,
        temperature: `${hour.temp}°F`,
        windSpeed: `${hour.wind_speed} mph`,
        precipitationProbability: `${hour.pop * 100}%`,
        summary: hour.weather[0].description,
      }));
      res.json(hourlyForecast);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error fetching hourly forecast' });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});