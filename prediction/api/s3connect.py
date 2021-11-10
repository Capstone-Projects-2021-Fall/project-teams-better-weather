import os
import json
import requests
import boto3
from botocore.exceptions import ClientError
from model import Model

model = Model()

def fetch_data(bucket, coord):
  """
  Fetch hourly weather data from S3
  """
  client = boto3.client('s3')  
  lon, lat = coord
  key = f"{lon},{lat}.json"
  if check_exists(client, bucket, key):
    response = client.get_object(Bucket=bucket, Key=key)
  else:
    upload_data(bucket, coord) 
    response = client.get_object(Bucket=bucket, Key=key)
  ret = response["Body"].read().decode()
  return json.loads(ret)

def check_exists(client, bucket, key):
  """
  Checks if key is in bucket
  """
  try: 
    client.head_object(Bucket=bucket, Key=key)
  except ClientError as e:
    return int(e.response['Error']['Code']) != 404
  return True

def upload_data(bucket, coord):
  """
  Upload prediction from model to S3
  """
  client = boto3.client('s3')  
  lon, lat = coord
  key = f"{lon},{lat}.json"
  out = get_prediction(coord)
  client.put_object(Body=out, Bucket=bucket, Key=key)

def get_prediction(coord):
  lon, lat = coord
  url = "https://api.openweathermap.org/data/2.5/onecall"
  api_key = os.environ["OWM_API_KEY"]
  params = {"lat": f"{lat}", "lon": f"{lon}", "exclude": "current,minutely,daily,alerts", "appid": f"{api_key}"}
  r = requests.get(url, params=params)

  x = r.json() 
  # load relevant data into numpy array
  # ...
  out = model(x)
  return out

