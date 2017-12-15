from flask import Flask, render_template, request, Response, jsonify
from flask_sqlalchemy import SQLAlchemy
from collections import OrderedDict
import json
from flask_cors import CORS,cross_origin


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost/serie_manager'
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

@app.route("/")
@cross_origin()

##
## @brief      { function_description }
##
## @return     { description_of_the_return_value }
##
def index():
    return 'Welcome'

@app.route("/users", methods=['GET'])
@cross_origin()
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

##
## @brief      { function_description }
##
## @return     { description_of_the_return_value }
##
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

##
## @brief      { function_description }
##
## @return     { description_of_the_return_value }
##
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
def update_users():
	data = request.get_json()
	json_response = {}

	try:
		id = data['id']
		username = data['username']
		email = data['email']
		password = data['password'] 
		admin = data['admin']

		print(username)
		print(email)
		print(password)
		print(admin)

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

@app.route("/login", methods=['GET','POST'])
@cross_origin()

##
## @brief      { function_description }
##
## @return     { description_of_the_return_value }
##
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
			admin = bool(admin.admin);
			print(admin)
			if admin:
				json_response.update({'admin' : 'true'});
			else:
				json_response.update({'admin' : 'false'});

	except:
		json_response.update({'connection' : 'false'})
	print(json_response)
	return jsonify(json_response)




if __name__ == "__main__": #only start webserver if this file is called directly
	app.run(debug=True)





# xx = []
# ex = User.query.all()
# for x in ex:
#  	xx.append({'username' : x.username,'email' : x.email,'password' : x.password})

# print(xx)
 

#print(xx)
# insert = User('vvvv','ccc@gmail.com','mnb')
# db.session.add(insert)
# db.session.commit()

#update = User.query.filter_by(username='aaa').first()
#update.username = 'bbb'
#db.session.commit()


# dele = User.query.filter_by(id = 2).first()
# db.session.delete(dele)
# db.session.commit()