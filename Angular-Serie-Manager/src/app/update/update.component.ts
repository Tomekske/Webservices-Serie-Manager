import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute,Router, Params } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id = 0;
  sUsername = '';
  sEmail = '';
  sPassword = '';
  sAdmin= '';
  admin = 0;
  email_exists = false;
  username_exists =false;

  baseUrl = 'http://localhost:5000/users/single';
  baseUrll = 'http://localhost:5000/users/update';
  request = {
  	id: 0
  };

    update = {
    id : 0,
  	username : "",
  	email : "",
  	password : "",
  	admin : 0
  };
  constructor(private route: ActivatedRoute,private http: HttpClient,private router: Router) { }

  ngOnInit() {
  	  	this.route.params.subscribe(params =>{
  		this.id = params['id'];
  	    this.request.id = this.id;


  	 });

    this.http.post(this.baseUrl, JSON.stringify(this.request),{headers: new HttpHeaders().set('Content-Type', 'application/json')})
    .subscribe(res => {
          if(res['connection'] === 'true')
          {
          	this.sUsername = res['username'];
          	this.sEmail = res['email'];
          	this.sPassword = res['password'];
          	if(res['admin'] === 1)
            {
	           	this.sAdmin = 'True';
          	}
          	else
            {
            	this.sAdmin = 'False';
          	}
          }
          else
          {
             alert("Could not update user");
          }
    	},
  	);
  }

  send()
  {
  	this.update.id = this.id;
  	this.update.username = this.sUsername;
  	this.update.email = this.sEmail;
  	this.update.password = this.sPassword;

  	if(this.sAdmin === 'True')
    {
  		this.update.admin = 1;
    }
    else
    {
  		this.update.admin = 0;
    }
  	//this.update.admin = this.adminn;

	this.http.put(this.baseUrll, JSON.stringify(this.update),{headers: new HttpHeaders().set('Content-Type', 'application/json')})
	    .subscribe(res => {
        if(res['connection'] === 'true')
        {
        	if(res['check_email'] === 'ok' && res['check_username'] === 'ok')
        	{
        		this.router.navigate(['/dashboard']);
        	}

        	else if(res['check_email'] === 'exists' && res['check_username'] === 'exists')
        	{
				    this.email_exists = true;
				    this.username_exists = true;
        	}
          
          else if(res['check_email'] === 'exists' && res['check_username'] === 'ok')
        	{
				    this.email_exists = true;
				    this.username_exists = false;
        	}
        	
        	else if(res['check_email'] === 'ok' && res['check_username'] === 'exists')
        	{
				    this.email_exists = false;
				    this.username_exists = true;
        	}
        }

        else
        {
        	alert("Could not update user");
        }
		  },
  	);
  }
}