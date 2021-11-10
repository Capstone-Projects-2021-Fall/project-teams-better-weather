# Better Weather
Modern weather reports are made every morning by sending up a weather balloon into the atmosphere to make a bunch of recordings and then meteorologists who have studied their craft for years make an educated guess that the rest of the world then plans their day around. This application will instead make a weather prediction based on historical data and a machine learning algorithm cutting out the possibility of human error.


## Release Notes 2
* Improved UI
* Added horizontal scrolling for hourly weather
* Added domain name: https://betterweather.xyz/
* Decoupled React and Flask (on separate servers)
* Better Weather API at: https://api.betterweather.xyz/
* Added geocoding with Google Geocoding API
* Bug fix where misspelled or non-city location search crashes website
* 

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
npm install
```

## Start development
```
# Start react app
npm start

# Start flask on another terminal
npm run start-api
```

