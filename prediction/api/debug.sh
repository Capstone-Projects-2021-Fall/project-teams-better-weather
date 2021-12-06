#!/bin/bash
sudo systemctl daemon-reload 
/home/brucewayne/bw/prediction/api/venv/bin/python3 /home/brucewayne/bw/prediction/api/venv/bin/gunicorn -b 127.0.0.1:5000 api:app
