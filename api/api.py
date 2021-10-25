import random
from flask import Flask, request
from s3connect import fetch_data, fetch_currently

BUCKET = "bw-preds"

app = Flask(__name__)

@app.route('/api/currently/', methods=['GET'])
def get_currently():
  #coord = request.args.get("coord").split(",")
  location = request.args.get("location")
  currently = fetch_currently(location)
  return currently

@app.route('/api/hourly/', methods=['GET'])
def get_hourly():
  coord = request.args.get("coord").split(",")
  hourly = fetch_data(BUCKET, coord)
  return hourly
