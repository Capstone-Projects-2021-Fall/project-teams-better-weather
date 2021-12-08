# Better Weather
Better Weather aims to improve on the weather prediction process. The goal of Better Weather is to be able to predict short term hourly weather with as good or better accuracy than the current numerical models that are widely used. With years of historical data from the National Oceanic and Atmospheric Administration (NOAA), we utilized deep neural networks to learn from the historical data alone to make predictions. We hope data-driven machine learning will replace numerical models one day.

**We are live at** https://betterweather.xyz/

# v0.4 Release Notes 
## New Features
* Docstrings for React and Flask API 
  * Auto-generate API reference with JSDoc and Sphinx, respectively
* Jupyter notebook clean up for readablility
* Auxilary attributes (humidity, wind speed, etc) for current weather
* About page
* UI Improvements:
  * Vertical scroll for hourly weather
  * Scaling component sizes for mobile
  * Hourly timestamps

## Known bugs
  * bug

# Build and deploy
## React
```
npm run build 
mv build/ /var/www/bw/

cat api/deploy/react_nginx > /etc/nginx/sites-available/default
sudo systemctl start nginx
sudo systemctl reload nginx
```
## BetterWeather API
```
# Create virtual environment
cd api 
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# To deactivate virtual env
deactivate

cat api/deploy/bw-flask.service > /etc/systemd/system/bw-flask.service
./api/reload_flask.sh

cat deploy/api_nginx /etc/nginx/sites-available/default
sudo systemctl reload nginx
```
## Prediction Server API 
```
cat api/deploy/bw-pred.service > /etc/systemd/system/bw-pred.service
./prediction/api/reload.sh

cat deploy/predapi_nginx /etc/nginx/sites-available/default
sudo systemctl reload nginx

crontab -e
01 * * * * /home/ubuntu/bw/prediction/api/venv/bin/python3 /home/ubuntu/bw/prediction/api/hourly_forecast.py
```

# Development
## Set up environment
```
# Install node modules
yarn install
```

## Start development
```
# Start react app
yarn start
```

