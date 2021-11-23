import random
from flask import Flask, request, jsonify
from s3connect import fetch_hourly, fetch_currently, fetch_forecast

BUCKET = "bw-preds"
app = Flask(__name__)

@app.route('/')
def home():
  home = open("index.html", "r").read()
  return home

@app.route('/forecast/', methods=['GET'])
def get_forecast():
  """
  Get weather forecast (current and hourly) of particular location
  :param location: name of location
  :type location: string
  :return A response object containing JSON of current and hourly weather data (temperature, summary, etc)
  :rtype flask.wrappers.Response
  """
  location = request.args.get("location")
  response = jsonify(fetch_forecast(BUCKET, location))
  #print(response)
  response.headers.add("Access-Control-Allow-Origin", "*")
  return response

@app.route('/currently/', methods=['GET'])
def get_currently():
  """
  Get current weather forecast of particular location
  :param location: name of location
  :type location: string
  :return A response object containing JSON of current weather data (temperature, summary, etc)
  :rtype flask.wrappers.Response, ex. <Response 438 bytes [200 OK]>
  """
  location = request.args.get("location")
  response = jsonify(fetch_currently(location))
  response.headers.add("Access-Control-Allow-Origin", "*")
  print("currently", response)
  print(type(response))
  return response

@app.route('/hourly/', methods=['GET'])
def get_hourly():
  """
  Get hourly weather forecast of particular location
  :param coord: longitude and latitude coordinates of location
  :type coord: string 
  :return A response object containing JSON of hourly weather data (temperature, summary, etc)
  :rtype flask.wrappers.Response, ex. <Response 1489 bytes [200 OK]>
  """
  coord = request.args.get("coord").split(",")
  response = jsonify(fetch_hourly(BUCKET, coord))
  response.headers.add("Access-Control-Allow-Origin", "*")
  print("hourly", response)
  print(type(response))
  return response
