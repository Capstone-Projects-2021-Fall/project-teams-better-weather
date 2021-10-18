import random
from flask import Flask
from s3connect import fetch_data

BUCKET = "bw-preds"

app = Flask(__name__)

@app.route('/api/currently')
def get_currently():
  return {'currentTemp': random.randint(0, 100)}

@app.route('/api/hourly/', methods=['GET'])
def get_hourly():
  location = (-74.006, 40.7143)
  hourly = fetch_data(BUCKET, location)
  return hourly
