# Milestone 2 
* Added Navbar
* Improved UI
* Better Weather API
* Automatic location services
* Bug fix where misspelled or non-city location search crashes website

# Milestone 1
## Release Notes
Better Weather is in its infancy and many of our planned features are under construction or need refinement. We currently have a front-end mockup for users to access current/hourly weather information. The main focus of this project is the machine learning (ML) algorithms that will be generating weather predictions; however, our ML algorithms are still under development and are not ready to be available on the site.

The current state of our ML algorithm is available [here](https://github.com/Capstone-Projects-2021-Fall/project-teams-better-weather/blob/main/prediction/philly.ipynb).
The prediction algorithm is currently only trained on weather data from Philadelphia as we are working towards figuring out how to add time and location (latitude, longitude) as predictive variables for weather. Once we solve this problem, we will start training our model with weather data from many locations.

Our website is live [here](http://18.234.149.24:3000/). 
Users are able to search for location and be presented with its current weather from OpenWeatherAPI. The hourly weather displayed is fake data generated and stored in a AWS S3. Once our model is complete, the fake model will be replaced with the real. The icon and background of the landing page are responsive and change in relation to the location's weather (sunny, cloudy, rain, etc.). 
 
## What's New
* Fetch current weather data from OpenWeatherAPI
* Display current weather (temperature and summary)
* Location search
* Display searched location
* Display weather icon in relation to temperature
* Fetch fake hourly data from AWS S3 database
* Display hourly weather 
* Train weather data from Philadelphia with Long Short-Term Memory (LSTM) network
