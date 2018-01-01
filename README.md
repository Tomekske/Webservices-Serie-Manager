# Project #
### Title ###
 	TV-show manager
### Created by ###
    Joostens Tomek
### Description ###
    This website helps you to maintain your TV-show collection, obtain serie information and add shows to your own collection.

# Download project #
	git clone https://github.com/Tomekske/Webservices-Serie-Manager
# Front-end #
### 1. Install project dependencies ###
#### 1.1 Enter Angular-Serie-Manager directory ####
	cd Angular-Serie-Manager
#### 1.2 Install dependencies ####
	npm install
### 2. Run project ###
	ng serve
### 3.Compile project
	ng build --prod --aot

# Back-end #
### 1. Downloading and installing python version - 3.6.3 or newer ###
#### 1.1 Download python from official website #### 
	https://www.python.org/downloads/
#### 1.2 Test python version ####
	python -V

### 2. Download modules ###
#### 2.1 Flask ####
	pip install Flask
#### 2.2 SQLAlchemy ####
	pip install SQLAlchemy
#### 2.3 CORS ####
	pip install flask-cors
#### 2.4 Configparser ####
	pip install configparser

### 3. Database ###
#### 3.1 Import SQL script into phpmMyAdmin ###
	serie_manager.sql
#### 3.2 You may have to change your database configuration ####
	Flask/init.ini
### 4. Running server ###
#### 4.1 Enter Flask directory ###
	cd Flask
#### 4.2 Run server ####
	python serie_manager.py
#### 4.3 Stop server ####
	CTRL + C




