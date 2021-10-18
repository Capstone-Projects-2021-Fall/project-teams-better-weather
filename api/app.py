import random
from flask import Flask, request
from s3connect import fetch_data

BUCKET = "bw-preds"

app = Flask(__name__)

@app.route('/api/currently', methods=['GET'])
def get_currently():
  return {'currentTemp': random.randint(0, 100)}

@app.route('/api/hourly/', methods=['GET'])
def get_hourly():
  coord = request.args.get("coord").split(",")
  hourly = fetch_data(BUCKET, coord)
  return hourly
