import random
from flask import Flask, request, jsonify
from s3connect import fetch_data, fetch_currently

BUCKET = "bw-preds"

app = Flask(__name__)

@app.route('/')
def home():
  return "<h1>better weather api</h1>"

@app.route('/currently/', methods=['GET'])
def get_currently():
  #coord = request.args.get("coord").split(",")
  location = request.args.get("location")
  response = jsonify(fetch_currently(location))
  response.headers.add("Access-Control-Allow-Origin", "*")
  return response

@app.route('/hourly/', methods=['GET'])
def get_hourly():
  coord = request.args.get("coord").split(",")
  response = jsonify(fetch_data(BUCKET, coord))
  response.headers.add("Access-Control-Allow-Origin", "*")
  return response
