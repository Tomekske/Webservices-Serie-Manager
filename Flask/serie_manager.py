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
	__tablename__ = 'user'
	id = db.Column('id', db.Integer, primary_key=True)
	username = db.Column('username', db.Unicode, primary_key=True)
	email = db.Column('email', db.Unicode, primary_key=True) #varchar
	password = db.Column('password', db.Unicode)

	def __init__(self, username, email, password): #constructor
		self.id = id
		self.username = username
		self.email = email
		self.password = password

@app.route("/")
@cross_origin()
def index():
    return 'Welcome'

@app.route("/users", methods=['GET'])
@cross_origin()
def users():
	a = {} 
	xx = []
	print(type(xx))
	ex = User.query.all()
	i = 0
	for x in ex:
		i+=1
		xx.append(
				 {'id' : x.id,
			       'username' : x.username,
				   'email' : x.email,
				   'password' : x.password
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