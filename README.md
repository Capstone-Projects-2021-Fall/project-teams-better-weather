# Better Weather
Modern weather reports are made every morning by sending up a weather balloon into the atmosphere to make a bunch of recordings and then meteorologists who have studied their craft for years make an educated guess that the rest of the world then plans their day around. This application will instead make a weather prediction based on historical data and a machine learning algorithm cutting out the possibility of human error.

# Access our application here!
- https://betterweather.xyz/

# Features for release 3
- User authentication, so users can have their own accounts!
- Users with accounts can log back into the application and be met with the most recent search location.
- Displays real predictions from our machine learning model!
- Prediction data is now horizontally scrollable for all users, regardless if using a mouse, trackpad, keyboard or touch device.
- UI Improvements: 
  - Prediction data and real time weather data are more distinguishable.
  - Navigation bar is integrated with application's background color.
  - Login functionality is integrated into the NavBar.




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

