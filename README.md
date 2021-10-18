# Better Weather
Modern weather reports are made every morning by sending up a weather balloon into the atmosphere to make a bunch of recordings and then meteorologists who have studied their craft for years make an educated guess that the rest of the world then plans their day around. This application will instead make a weather prediction based on historical data and a machine learning algorithm cutting out the possibility of human error.

## Release Notes V(1.0) Milestone 1
At this time Better Weather in deep in construction and as of now we have front end mockup for you to look at. 
Be aware that a large majority of this project is the machine learning algorithms that will be gernerating our predictions and that wont be 
available on the site until it is completed.   
  
To take a look at the current training algorithm click [here](https://github.com/Capstone-Projects-2021-Fall/project-teams-better-weather/blob/main/prediction/philly.ipynb)  
Currently the prediction algorithm is only trained on Philadelphia data as I am working towards figuring out how to use more than one variable (date at the moment) to generate a prediction. The ultimate goal is to be able to predict based off of dateTime and location (lattitude, longitude, altitude).    
  
To access our site follow this [link](http://18.234.149.24:3000/).
When viewing the site you are able to search for a location and will be presented with its current weather. 
The icon and background of the landing page are responsive and change in relation to the weather. (sunny, cloudy, rain, etc.). 

## Set up environment
```
# Create virtual environment
cd api 
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt

# To deactivate virtual env
deactivate
```

## Start development
```
# Start react app
npm start

# Then flask on another terminal
npm run start-api
```
