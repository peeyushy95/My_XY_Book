# Mybook
Mybook is a digital book which user will be creating. User can create content, reorder and organise them.

## Setup using Docker

1) Install Docker
2) Start Docker
3) Open `My_XY_book` folder. 
4) Run command `docker-compose up`. This will first install all required angular and django dependencies then starts severs.
5) Navigate to `http://localhost:4200/` in browser.

## Setup Without Docker

### PostgreSQL Setup

1) Install PostgreSQL
2) set `HOST (Line: 86)` field to `localhost` in `My_XY_Book/django_back/django_back/settings.py`
3) configure PostgreSQL settings based on `DATABASES(Line: 82)` in `My_XY_Book/django_back/django_back/settings.py`
4) if PostgreSQL is configured with password then add field : `'PASSWORD': 'your password'`
4) Run at localhost:5432

### Angular Setup

1) Install Node.js
2) go to My_XY_Book/webApp/
3) Run npm install
4) Run npm start

Navigate to `http://localhost:4200/` in browser.
