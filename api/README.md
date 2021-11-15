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
  server_name 18.234.149.24 betterweather.xyz;

  if ($host = betterweather.xyz) {
    return 301 https://$host$request_uri;
  } # managed by Certbot
  return 404; # managed by Certbot
}
server {
  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl; # managed by Certbot
  server_name 18.234.149.24 betterweather.xyz;
  root /var/www/bw/build;
  index index.html index.htm;

  ssl_certificate /etc/letsencrypt/live/betterweather.xyz/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/betterweather.xyz/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

  location / {
    # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
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

### Flask API

```
vi /etc/systemd/system/bw-flask.service

[Unit]
Description=Better Weather's Flask API
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/bw/api
ExecStart=/home/ubuntu/bw/api/venv/bin/gunicorn -b 127.0.0.1:5000 api:app
Restart=always

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl daemon-reload
sudo systemctl start bw-flask
sudo systemctl status bw-flask
```

```
vi /etc/nginx/sites-available/default

server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name 3.84.82.118 api.betterweather.xyz;

  if ($host = api.betterweather.xyz) {
    return 301 https://$host$request_uri;
  } # managed by Certbot
  return 404; # managed by Certbot
}

server {
  listen 443 ssl; # managed by Certbot
  listen [::]:443 ssl; # managed by Certbot
  server_name api.betterweather.xyz;

  ssl_certificate /etc/letsencrypt/live/api.betterweather.xyz/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/api.betterweather.xyz/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

  location / {
    include proxy_params;
    proxy_pass http://localhost:5000;
    proxy_redirect off;
    proxy_set_header Host $host; 
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}

sudo systemctl reload nginx
```
