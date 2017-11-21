import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  checkUsername = false;
  checkPassword = false;
  constructor() { }

  ngOnInit() {
  }

  checkInputs()
  {
  	if(this.username.length === 0 && this.password.length === 0)
  	{
  		this.checkUsername = true;
  		this.checkPassword = true;
  	}
    else if(this.username.length === 0)
  	{
  		this.checkUsername = true;
  		this.checkPassword = false;

  	}
  	else if(this.password.length === 0)
  	{
  		this.checkUsername = false;
  		this.checkPassword = true;  		
  	}
  	else
  	{
  		this.checkUsername = false;
  		this.checkPassword = false;
  	}
  }
}


