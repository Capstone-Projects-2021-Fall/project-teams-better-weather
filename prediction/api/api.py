import random
from flask import Flask, request, jsonify
from s3connect import upload_data

BUCKET = "bw-preds"
app = Flask(__name__)

@app.route('/')
def home():
  return "<h1>whats up</h1>"

@app.route('/preds/', methods=['GET'])
def get_predictions():
  coord = request.args.get("coord").split(",")
  response = jsonify(upload_data(BUCKET, coord))
  response.headers.add("Access-Control-Allow-Origin", "*")
  return response

