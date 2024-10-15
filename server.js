const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 3000;

const API_KEY = '87b6625228345f0eb1666245b6367663'; 
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/zip';

app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});