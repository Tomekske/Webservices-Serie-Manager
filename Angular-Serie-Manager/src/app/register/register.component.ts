import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute,Router, Params } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sUsername = "";
  sPassword = "";
  sEmail = "";
  baseUrl = 'http://localhost:5000/users/create';
  username_exists = false;
  email_exists = false;
  register = {
    username: "",
    email: "",
    password: ""
  };
  constructor(private http: HttpClient,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {

  }

  send()
  {
    this.register.username = this.sUsername;
    this.register.email = this.sEmail;
    this.register.password = this.sPassword;
    
    this.http.post(this.baseUrl, JSON.stringify(this.register),{headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe(res =>{

          if(res['connection'] === "true")
          {
            if((res['username'] == "ok") && (res['email'] == "ok"))
            {
              this.router.navigate(['/login']);
              this.username_exists = false;
              this.email_exists = false;                  
            }
            else if((res['username'] == "ok") && (res['email'] == "exists"))
            {
              this.email_exists = true;
              this.username_exists = false;            
            }
            else if((res['username'] == "exists") && (res['email'] == "ok"))
            {
              this.email_exists = false;
              this.username_exists = true;
            }
            else
            {
              this.username_exists = true;
              this.email_exists = true;
            }
          }
          else
          {
            alert("Could not connect with database");
          }
        },
    );
  }
}
