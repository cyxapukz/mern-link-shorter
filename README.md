## mern-link-shorter
### Dependencies:
```
DB: Mongo Atlas,
Backend: Express, Node.js
Frontend: React, React-Bootstrap
```
### Installation
For development:
Clone this repository and run commands:
```
npm install
npm client:install
```
Create folder `/config` and create file `default.json`:
```
{
  "port": 5000,
  "mongoUri": _mongo_atlas_connection_link_,
  "jwtSecret": _jwt_secret_str_,
  "baseUrl": "http://localhost:5000"
}
```
For deploy:
After steps of development run command: `client:build`
