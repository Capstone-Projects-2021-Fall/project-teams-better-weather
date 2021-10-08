# Better Weather



# Algorithm 
The prediction algorithm will be created off of the following attributes:   
* Temperature (F)
* Percipitation (mm)
* Hummidity (%)
* Wind Speed (m/sec)
* Air Pressure (mbar)
* Cloud Coverage (0-8)
* Wind Direction (0 - 359)
* Weather Condition (Clear, Sunny, Rain, etc)  


The weather condition will be the main predicted outcome, but we will be predicting each attribute of the weather. 



# Data Sets
[Philadelphia](https://www.wunderground.com/history/daily/KPHL/date/2016-9-30) : 9/30/2016 - one day hourly   
[Philadelphia](https://www.wunderground.com/history/daily/KPHL/date/2017-9-30) : 9/30/2017 - one day hourly  
[Philadelphia](https://www.wunderground.com/history/daily/KPHL/date/2016-9-30) : 9/30/2018 - one day hourly   
[Philadelphia](https://www.wunderground.com/history/daily/KPHL/date/2016-9-30) : 9/30/2019 - one day hourly   
[Philadelphia](https://www.wunderground.com/history/daily/KPHL/date/2016-9-30) : 9/30/2020 - one day hourly   

Philadelphia, San Fransisco, Los Angeles, and Austin : 01/01/2010 - 12/31/2010 - hourly can be found in resources folder. 

*If money were no option, this is the best source of data avbailable: [Metromatics](https://www.meteomatics.com/en/)

# Computational Nueral Network

https://www.sciencedirect.com/science/article/pii/S2666827020300074?via%3Dihub#fig1 


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

