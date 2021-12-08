# Weather Prediction

## Algorithm 
The prediction algorithm will be created off of the following attributes:   
* Temperature (F)
* Percipitation (mm)
* Hummidity (%)
* Wind Speed (m/sec)
* Air Pressure (mbar)
* Cloud Coverage (0-8)
* Wind Direction (0-359)
* Weather Condition (Clear, Sunny, Rain, etc)  

The weather temperature will be the main predicted outcome, but we will be predicting each attribute of the weather. 

## Data Sets
NOAA ISD: https://www.ncei.noaa.gov/data/global-hourly/archive/isd/

[Philadelphia](https://www.wunderground.com/history/daily/KPHL/date/2016-9-30) : 9/30/2016 - one day hourly   
[Philadelphia](https://www.wunderground.com/history/daily/KPHL/date/2017-9-30) : 9/30/2017 - one day hourly  
[Philadelphia](https://www.wunderground.com/history/daily/KPHL/date/2016-9-30) : 9/30/2018 - one day hourly   
[Philadelphia](https://www.wunderground.com/history/daily/KPHL/date/2016-9-30) : 9/30/2019 - one day hourly   
[Philadelphia](https://www.wunderground.com/history/daily/KPHL/date/2016-9-30) : 9/30/2020 - one day hourly   

Philadelphia, San Fransisco, Los Angeles, and Austin : 01/01/2010 - 12/31/2010 - hourly can be found in resources folder. 

*If money were no option, this is the best source of data available: [Metromatics](https://www.meteomatics.com/en/)*

## ConvLSTM
https://www.sciencedirect.com/science/article/pii/S2666827020300074
