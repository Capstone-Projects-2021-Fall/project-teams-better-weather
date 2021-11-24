import os
import json
import requests
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
load_dotenv()

def fetch_hourly(bucket, coord):
  """
  Fetch hourly weather data from S3

  Parameters
  ---------
  bucket : string
    The name of the S3 bucket
  coord : tuple
    A tuple of longitude and latitude (lon, lat)

  Returns 
  ---------
    hourly : json
      A json list of 12 hours of weather data of coord
  """
  client = boto3.client('s3')  
  key = f"{coord[0]},{coord[1]}.json"
  if check_exists(client, bucket, key):
    response = client.get_object(Bucket=bucket, Key=key)
  else:
    resp = call_prediction(coord)
    if resp.status_code != 200: 
      return None # there should be error msg 
    response = client.get_object(Bucket=bucket, Key=key)
  ret = response["Body"].read().decode()
  return json.loads(ret)

def check_exists(client, bucket, key):
  """
  Returns if key exists in bucket

  Parameters
  ---------
  client : s3.client
    boto3 s3 client class
  bucket : string
    The name of the S3 bucket
  key : string
    The name of the key (filename)

  Returns
  ---------
  exists : boolean 
    A boolean of if the key exists in given bucket
  """
  try: 
    client.head_object(Bucket=bucket, Key=key)
  except ClientError as e:
    return int(e.response['Error']['Code']) != 404
  return True

def call_prediction(coord):
  """
  Call model to make a prediction
  
  Parameters
  ---------
  coord : tuple
    A tuple of longitude and latitude (lon, lat)

  Returns 
  ---------
  r : Response object
    A response from the prediction server. 

    Status code: 200 for success. 503 for failure.
  """
  lon, lat = coord
  url = f"https://pred.betterweather.xyz/preds/?coord={lon},{lat}"
  r = requests.get(url)
  return r

def geocode(location):
  """
  Convert user location search into geographic coordinates

  Parameters
  ---------
  location : string 
    the name of location

  Returns
  ---------
  coord : tuple 
    A tuple of coordinates (lon, lat)
  address : string
    The name of the location 
  None
    If no results, then None
  """
  url = "https://maps.googleapis.com/maps/api/geocode/json"
  api_key = os.environ["GOOGLE_API_KEY"]
  params = {"address": f"{location}", "key": f"{api_key}"}
  r = requests.get(url, params=params)
  if (len(r.json()["results"]) != 0):
    results = r.json()["results"][0]
    coord = results["geometry"]["location"]
    address = results["formatted_address"]
    return (coord["lng"], coord["lat"]), address
  return None, None, None

def fetch_currently(location):
  """
  Fetch current weather data from Open Weather API 

  Parameters
  ---------
  location : string 
    The name of location

  Returns
  ---------
  ret : json
    A json of current weather data (temperature, summary, etc)
  """
  (lon, lat), address = geocode(location) 
  url = "https://api.openweathermap.org/data/2.5/onecall"
  api_key = os.environ["OWM_API_KEY"]
  params = {"lat": f"{lat}", "lon": f"{lon}", "exclude": "hourly,minutely,daily,alerts", "units": "metric", "appid": f"{api_key}"}
  r = requests.get(url, params=params)
  
  # theres gotta be a better way
  ret = {}
  ret["currently"] = r.json()
  ret["currently"]["address"] = address  
  print(ret)
  return ret

def fetch_forecast(bucket, location):
  """
  Fetch current and hourly weather data (unified call).

  Parameters
  ---------
  bucket : string
    The name of the S3 bucket
  location : string 
    The name of location

  Returns 
  ---------
  data : json
    A json of current and hourly weather data (temperature, summary, etc)
  """
  (lon, lat), address = geocode(location) 
  url = "https://api.openweathermap.org/data/2.5/onecall"
  api_key = os.environ["OWM_API_KEY"]
  params = {"lat": f"{lat}", "lon": f"{lon}", "exclude": "hourly,minutely,daily,alerts", "appid": f"{api_key}"}
  r = requests.get(url, params=params)
  
  data = fetch_data(bucket, (lon, lat))
  data["currently"] = r.json()["current"]
  data["hourly"] = data.pop("hourly")
  print(data)
  #print(r.json()["current"])
  return data
