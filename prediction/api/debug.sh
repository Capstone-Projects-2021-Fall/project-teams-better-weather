#!/bin/bash
sudo systemctl daemon-reload 
/home/ubuntu/bw/prediction/api/venv/bin/python3 /home/ubuntu/bw/prediction/api/venv/bin/gunicorn -b 127.0.0.1:5000 api:app
