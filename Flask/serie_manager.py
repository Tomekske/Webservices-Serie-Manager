from flask import Flask, render_template, request, Response, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
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
def index():
    return 'Welcome'

@app.route("/users", methods=['GET'])
@cross_origin()
def users():
	a = {} 
	xx = []
	ex = User.query.all()
	i = 0
	for x in ex:
		i+=1
		xx.append(
				 { 'id' : x.id,
			       'username' : x.username,
				   'email' : x.email,
				   'password' : x.password,
				   'admin' : x.admin
				})
	a = {'total_results' : i, 'results' : xx}


	print(i)
	yy = json.dumps(xx, ensure_ascii=False)
	resp = jsonify(yy)
	if 'application/json' not in request.headers.get('Accept', ''):
   	 resp.mimetype = 'text/plain'
	#return resp
	return jsonify(a)
	#return Response(json.dumps(yy,ensure_ascii=False), mimetype='application/json;charset=utf-8')
	
	#return render_template('users.html', users = yy)
@app.route("/users/delete", methods=['GET','DELETE'])
@cross_origin()
def users_delete():
	id = request.args.get('id', type = int)
	delelete_user = User.query.filter_by(id = id).first()
	db.session.delete(delelete_user)
	db.session.commit()
	#return resp
	return jsonify('OK')

@app.route("/users/create", methods=['POST'])
@cross_origin()
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
		json_response.update({'connection' : 'ok'})
		
		username_exists = db.session.query(db.exists().where(User.username == username)).scalar()
		email_exists = db.session.query(db.exists().where(User.email == email)).scalar()


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
				print("beide bestaan")
				json_response.update({'username' : 'exists'})
				json_response.update({'email' : 'exists'})

	except exc.IntegrityError as e:
		json_response.update({'connection' : 'failed'})
		#print(e)

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