# Better Weather
Better Weather aims to improve on the weather prediction process. The goal of Better Weather is to be able to predict short term hourly weather with as good or better accuracy than the current numerical models that are widely used. With years of historical data from the National Oceanic and Atmospheric Administration (NOAA), we utilized deep neural networks to learn from the historical data alone to make predictions. We hope data-driven machine learning will replace numerical models one day.

**We are live at** https://betterweather.xyz/

## v0.4 Release Notes 
### New Features
* Docstrings for React and Flask API 
  * Auto-generate API reference with JSDoc and Sphinx, respectively
* Jupyter notebook clean up for readablility
* Auxilary attributes (humidity, wind speed, etc) for current weather
* About page
* UI Improvements:
  * Vertical scroll for hourly weather
  * Scaling component sizes for mobile
  * Hourly timestamps

### Known bugs
  * Redundant Firebase authentication in many components
  * Timestamp formatting issues
  * Empty wind gust auxilary attribute sometimes
  * Font sync issue between `yarn start` and `build`
  * Github action `build_deployment` deploys a white page, `scp -r` works locally though

Find previous release notes in [releases tab](https://github.com/Capstone-Projects-2021-Fall/project-teams-better-weather/releases).

## Build and deploy
### React
```
git clone https://github.com/Capstone-Projects-2021-Fall/project-teams-better-weather.git bw
yarn run build 
mv build/ /var/www/bw/

cat api/deploy/react_nginx > /etc/nginx/sites-available/default
sudo systemctl start nginx
sudo systemctl reload nginx
```
### BetterWeather API
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
### Prediction Server API 
```
cat api/deploy/bw-pred.service > /etc/systemd/system/bw-pred.service
./prediction/api/reload.sh

cat deploy/predapi_nginx /etc/nginx/sites-available/default
sudo systemctl reload nginx

crontab -e
01 * * * * /home/ubuntu/bw/prediction/api/venv/bin/python3 /home/ubuntu/bw/prediction/api/hourly_forecast.py
```
### Other
```
# AWS credentials
vi ~/.aws/credentials

# Firebase config
vi .env.local
```

## Start development
```
# Install node modules
yarn install

# Start react app
yarn start
```

