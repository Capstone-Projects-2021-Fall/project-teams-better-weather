#!/bin/bash
sudo systemctl daemon-reload
sudo systemctl restart bw-pred
sudo systemctl status bw-pred
