# Better Weather
Better Weather aims to change the weather prediction process. The goal of Better Weather is to be able to predict short term hourly weather with as good or better accuracy than the current numerical models that are widely used. With years of historical data from the National Oceanic and Atmospheric Administration (NOAA), we utilized deep neural networks to learn from the historical data alone to make predictions. We hope data-driven machine learning will replace numerical models one day.

## We are live here!
* https://betterweather.xyz/

## Features for final release
* Docstrings for React and Flask API 
  * Auto-generate API reference with JSDoc and Sphinx, respectively
* Clean code for readablility in jupyter notebooks
* Added auxilary attributes (humidity, wind speed, etc) for current weather
* Update about page
* UI Improvements:
  * Vertical scroll for hourly weather
  * Scaling component sizes for mobile
  * Hourly timestamps

## Known bugs
  * bug

## Set up environment
```
# Create virtual environment
cd api 
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# To deactivate virtual env
deactivate

# Install node modules
yarn install
```

## Start development
```
# Start react app
yarn start

# Start flask on another terminal
yarn run start-api
```

