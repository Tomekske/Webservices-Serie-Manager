from flask import Flask, render_template, request, Response, jsonify
from flask_sqlalchemy import SQLAlchemy
from collections import OrderedDict
import json
from flask_cors import CORS,cross_origin
import configparser

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

#parse config file with database information
config = configparser.ConfigParser()
config.read('init.ini')

database = config['db']['database']
username = config['db']['username']
host = config['db']['host']
table = config['db']['table']

app.config['SQLALCHEMY_DATABASE_URI'] = "{}://{}@{}/{}".format(database,username,host,table)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)



class User(db.Model):
	__tablename__ = 'users'
	id = db.Column('id', db.Integer, primary_key=True)
	username = db.Column('username', db.Unicode)
	email = db.Column('email', db.Unicode) #varchar
	password = db.Column('password', db.Unicode)
	admin = db.Column('admin', db.Integer)

	def __init__(self, username, email, password,admin): #constructor
		self.id = id
		self.username = username
		self.email = email
		self.password = password
		self.admin = admin

class Collection(db.Model):
	__tablename__ = 'collection'
	id = db.Column('id',db.Integer, primary_key=True)
	user_id = db.Column('user_id',db.Unicode)
	title = db.Column('title', db.Unicode)
	description = db.Column('description', db.Unicode)
	picture = db.Column('picture', db.Unicode)
	def __init__(self,user_id,title,description,picture):
		self.user_id = user_id
		self.title = title
		self.description = description
		self.picture = picture

@app.errorhandler(404)
@cross_origin()
## @brief      Catch 404 error
## @param      error code
## @return     Return index template
def page_not_found(error):
    return render_template('index.html'), 404

@app.route("/")
@cross_origin()

## @brief      index page of website
## @return     returns index page
def index():
	return render_template("index.html")

@app.route("/users", methods=['GET'])
@cross_origin()

## @brief      Get all users from database
## @return     returns JSON response
def users():
	json_response = {} 
	all_users = []

	try:
		get_users = User.query.all()
		i = 0
		for user in get_users:
			i+=1
			all_users.append(
					 { 'id' : user.id,
				       'username' : user.username,
					   'email' : user.email,
					   'password' : user.password,
					   'admin' : user.admin
					})
		json_response = {'total_results' : i, 'connection' : 'true', 'results' : all_users}
		
	except:
		json_response.update({'connection' : 'false'})
	return jsonify(json_response)
	#return Response(json.dumps(yy,ensure_ascii=False), mimetype='application/json;charset=utf-8')
	
	#return render_template('users.html', users = yy)


@app.route("/users/delete", methods=['GET','DELETE'])
@cross_origin()

## @brief      Delete a users from database
## @return     returns JSON response
def users_delete():
	id = request.args.get('id', type = int)
	json_response = {}
	try:
		delelete_user = User.query.filter_by(id = id).first()
		db.session.delete(delelete_user)
		db.session.commit()
		json_response.update({'connection' : 'true'})

	except:
		json_response.update({'connection' : 'false'})

	#return resp
	print(json_response)
	return jsonify(json_response)

@app.route("/users/create", methods=['GET','POST'])
@cross_origin()

## @brief      Create a users and store user in database
## @return     returns JSON response
def users_create():
	data = request.get_json()
	json_response = {}
	json_username = {}
	json_email = {}

	print('First: ', json_response)
	username = data['username']
	email = data['email']
	password = data['password']
	print('username:',username)
	print('email:',email)
	
	try:		
		username_exists = db.session.query(db.exists().where(User.username == username)).scalar()
		email_exists = db.session.query(db.exists().where(User.email == email)).scalar()
		json_response.update({'connection' : 'true'})

		if (not username_exists) and (not email_exists):
			json_response.update({'username' : 'ok'})
			json_response.update({'email' : 'ok'})

			insert = User(username,email,password,0)
			db.session.add(insert)
			db.session.commit()
			print("Data inserted to db")

		else:
			if username_exists and not email_exists:
				print("username bestaat")
				json_response.update({'username' : 'exists'})
				json_response.update({'email' : 'ok'})
			elif not username_exists and email_exists:
				print("email bestaat")
				json_response.update({'username' : 'ok'})
				json_response.update({'email' : 'exists'})
			else:
				print("bjoeide bestaan")
				json_response.update({'username' : 'exists'})
				json_response.update({'email' : 'exists'})

	except:
		json_response.update({'connection' : 'false'})
		#print(e)

	print(json_response)
	return jsonify(json_response)


@app.route("/users/single", methods=['POST','PUT'])
@cross_origin()
## @brief      Get login info from a single user
## @return     returns JSON response
def single_user():
	data = request.get_json()
	id = data['id']
	json_response = {}

	try:
		user_info = User.query.filter_by(id = id).first()

		json_response.update({"connection" : "true"})

		username = user_info.username
		email = user_info.email
		password = user_info.password 
		admin = user_info.admin

		json_response.update({"username" : username})
		json_response.update({"email" : email})
		json_response.update({"password" : password})
		json_response.update({"admin" : admin})

	except:
		json_response.update({"connection" : "false"})

	print(json_response)
	return jsonify(json_response)


@app.route("/users/update", methods=['POST','PUT'])
@cross_origin()
## @brief      Update user in database
## @return     returns JSON response
def update_users():
	data = request.get_json()
	json_response = {}

	try:
		id = data['id']
		username = data['username']
		email = data['email']
		password = data['password'] 
		admin = data['admin']

		check_username = User.query.filter_by(username = username).count()
		check_username = bool(check_username) #convert to boolean

		check_email = User.query.filter_by(email = email).count()
		check_email = bool(check_email) #convert to boolean

		update = User.query.filter_by(id = id).first()
		old_username = update.username
		old_email = update.email
		json_response.update({"connection" : "true"})

		print("old username:",old_username)
		print("old email:",old_email)
		if (not check_username or username == old_username) and (not check_email or email == old_email):
			json_response.update({"check_username" : "ok"})
			json_response.update({"check_email" : "ok"})
			json_response.update({"username" : username})
			json_response.update({"email" : email})
			json_response.update({"password" : password})
			json_response.update({"admin" : admin})	

			update.username = username
			update.email = email
			update.password = password
			update.admin = admin
			db.session.commit()		
		else:
			if (check_username) and (not username == old_username):
				json_response.update({"check_username" : "exists"})
				json_response.update({"check_email" : "ok"})

			if (check_email) and (not email == old_email):
				json_response.update({"check_email" : "exists"})
				json_response.update({"check_username" : "ok"})

			if ((check_username) and (not username == old_username)) and ((check_email) and (not email == old_email)):
				json_response.update({"check_username" : "exists"})
				json_response.update({"check_email" : "exists"})
	except:
		json_response.update({"connection" : "false"})

	print(json_response)
	return jsonify(json_response)

@app.route("/userlogin", methods=['GET','POST'])
@cross_origin()
## @brief      Check if user exsist in database
## @return     returns JSON response
def login():
	data = request.get_json()
	json_response = {}
	username = data['username']
	password = data['password']
	

	try:
		check_user = User.query.filter_by(username = username,password = password).count()
		check_user = bool(check_user) #convert to boolean
		json_response.update({'connection' : 'true'})

		if not check_user:
			print("No match found")
			json_response.update({'results' : 'false'})
		else:
			print("Match found")
			json_response.update({'results' : 'true'})
			admin = User.query.filter_by(username = username,password = password).first()
			id = admin.id
			admin = bool(admin.admin);
			json_response.update({'id' : id})

			if admin:
				json_response.update({'admin' : 'true'});
			else:
				json_response.update({'admin' : 'false'});

	except:
		json_response.update({'connection' : 'false'})
	print(json_response)
	return jsonify(json_response)


@app.route("/collection", methods=['GET','POST'])
@app.route("/collection/get", methods=['GET','POST'])
@cross_origin()
## @brief      Get a users collection
## @return     returns JSON response
def collection():
	json_response = {}
	all_series = []

	id = request.args.get('id', type = int)

	try:
		check_collection = Collection.query.filter_by(user_id = id).count() #check if collection exsists

		check_collection = bool(check_collection) #convert to boolean
		json_response.update({'connection' : 'true'})
		print("controleer:", check_collection)
		if(check_collection):
			json_response.update({'user_id' : 'true'});

			col = Collection.query.filter_by(user_id = id).all()
			i = 0
			for serie in col:
				i +=1
				all_series.append(
						{
							'title' : serie.title,
							'description' : serie.description,
							'picture' : serie.picture
						}
					)

			json_response.update({'collection' : all_series});
			json_response.update({'total_results' : i});

		else:
			json_response.update({'user_id' : 'false'});
			json_response.update({'total_results' : 0});

	except:
		json_response.update({'connection' : 'false'})
		json_response.update({'user_id' : 'false'});
	return jsonify(json_response)


@app.route("/collection/add", methods=['GET','POST'])
@cross_origin()
## @brief      Add a serie to users collection
## @return     returns JSON response
def addCollection():
	json_response = {}

	data = request.get_json()

	user_id = data['user_id']
	title = data['title']
	description = data['description']
	picture = data['picture']
	print(user_id)
	print(title)
	print(description)
	print(picture)

	try:		
		insert = Collection(user_id,title,description,picture)
		db.session.add(insert)
		db.session.commit()
		print("Data inserted to db")

		json_response.update({'connection' : 'true'})
		json_response.update({'inserted' : 'true'})
	except:
		json_response.update({'connection' : 'false'})
		json_response.update({'inserted' : 'false'})

	print(json_response)
	return jsonify(json_response)

@app.route("/collection/check", methods=['GET','POST'])
@cross_origin()
## @brief      Check if a serie is in a users collection or not
## @return     returns JSON response
def checkCollection():
	json_response = {}
	data = request.get_json()

	serie = data['title']
	id = data['user_id']

	print('serieeeee:', serie)
	print('idddd:', id)

	try:
		check_collection =  Collection.query.filter_by(title = serie,user_id = id).count()
		check_collection = bool(check_collection) #convert to boolean
		json_response.update({'connection' : 'true'})

		if check_collection:
			json_response.update({'collection' : 'true'})
		else:
			json_response.update({'collection' : 'false'})

	except:
		json_response.update({'connection' : 'false'})
		json_response.update({'collection' : 'false'})


	print("serie:", serie)
	print("id:", id)
	print("collection:",check_collection)
	return jsonify(json_response)

@app.route("/collection/delete", methods=['GET','POST','DELETE'])
@cross_origin()
## @brief      Delete a serie from users collection
## @return     returns JSON response
def deleteCollection():
	json_response = {}

	id = request.args.get('id', type = int)
	serie = request.args.get('title', type = str)

	print("del serie:", serie)
	print("del id:", id)

	try:
		check_collection =  Collection.query.filter_by(title = serie,user_id = id).count()
		check_collection = bool(check_collection) #convert to boolean
		json_response.update({'connection' : 'true'})

		if check_collection:
			json_response.update({'collection' : 'true'})
			
			delelete_user = Collection.query.filter_by(title = serie,user_id = id).first()
			db.session.delete(delelete_user)
			db.session.commit()
			json_response.update({'deleted' : 'true'})

		else:
			json_response.update({'collection' : 'false'})
			json_response.update({'deleted' : 'false'})

		
	except:
		json_response.update({'connection' : 'false'})

	return jsonify(json_response)

if __name__ == "__main__": #only start webserver if this file is called directly
	app.run(debug=True)
