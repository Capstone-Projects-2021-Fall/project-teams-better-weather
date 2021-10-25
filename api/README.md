## Deployment

### React
```
npm run build 
mv build/ /var/www/bw/
```

```
vi /etc/nginx/sites-available/default

server {
  listen 80 default_server;
  listen [::]:80 default_server;

  root /var/www/bw/build;

  index index.html index.htm;

  server_name 18.234.149.24 betterweather.xyz;

  location / {
    try_files $uri $uri/ =404;
    add_header Cache-Control "no-cache";
  }

  location /static {
    expires 1y;
    add_header Cache-Control "public";
  }

  location /api {
    include proxy_params;
    proxy_pass http://localhost:5000;
  }
}

sudo systemctl start nginx
sudo systemctl reload nginx
```

### Flask

```
vi /etc/systemd/system/bw-flask.service

[Unit]
Description=Better Weather's Flask API
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/bw/api
ExecStart=/home/ubuntu/bw/api/env/bin gunicorn -b 127.0.0.0:5000 api:app
Restart=always

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl daemon-reload
sudo systemctl start bw-flask
sudo systemctl status bw-flask
```
