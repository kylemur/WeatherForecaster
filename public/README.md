# Overview

I added to my learning of JavaScript by adding an HTML user interface that uses Node.js to run on localhost port 3000. 

The program allows the user to search weather data for a specific zip code in the USA. The output can be current, hourly, or daily weather data. To start the program, just enter "node server.js" or "node ." in the terminal. You will see "Server running at http://localhost:3000" in the terminal. You can Ctrl+Click on the link or open a web browser and enter the URL into the address bar.

I wanted to add to my program and turn it into a full-stack web application that could be hosted on Google Cloud for anyone to use. I also wanted more information displayed to the user so I add data like wind speed.

[Software Demo Video](http://youtube.link.goes.here)

# Web Pages

Currently, all the functions are available on the home page. The user enters a zip code and can receive current weather data by pressing the Enter key or by clicking the "Get Current Weather" button. The user can then click the "Get 8-Day Forecast" button or the "Get Hourly Forecast" button to receive daily or hourly weather data, respectively. 

# Development Environment

Node.js and Express run the web app. I wrote server.js to gather and process the data (back-end), home.html to create the user interface (front-end), and added some styling with main.css (front-end).

The functionality is all done with JavaScript. I used Express for the web application framework, the path module to help with file paths, and the axios module for API calls to get weather data.

# Useful Websites

* [Google Cloud App Building](https://console.cloud.google.com/products/solutions/details/dynamic-web-app-with-javascript?chat=true&hl=en&project=weather-forecaster-438419)
* [OpenWeather](https://openweathermap.org/api/one-call-3#current)

# Future Work

* Add a check list of what data to be displayed.
* Consolidate the code so there are not separate API calls for hourly and daily forecast data.
* Put online and add a Google Maps display of the zip code area.