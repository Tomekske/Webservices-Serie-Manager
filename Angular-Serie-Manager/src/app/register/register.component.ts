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
      .subscribe(res => {
              this.router.navigate(['/login']);


        },
      );
  }
}
