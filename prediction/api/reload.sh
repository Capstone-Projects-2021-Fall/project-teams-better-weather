#!/bin/bash
sudo systemctl daemon-reload
sudo systemctl restart bw-gunicorn
sudo systemctl status bw-gunicorn
