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
  """
  Return response of status code 200 for success or 503 for failure

  Parameters
  ---------
  coord : string
    The longitude and latitude coordinates of location

  Returns 
  ---------
  response : flask.wrappers.Response
    Status code 200 for success

    Status code 503 for failure
  """
  coord = request.args.get("coord").split(",")
  response = jsonify(upload_data(BUCKET, coord))
  response.headers.add("Access-Control-Allow-Origin", "*")
  print(response.status_code)
  return response

