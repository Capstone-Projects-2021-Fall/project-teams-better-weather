#!/bin/bash 
sudo systemctl daemon-reload 
sudo systemctl restart bw-flask
sudo systemctl status bw-flask
