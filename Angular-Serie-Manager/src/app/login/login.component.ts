import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sUsername = "";
  sPassword = "";
  login = {
    sentUsername: "",
    sentPassword: ""
  };
  constructor() { }

  ngOnInit() {
  }

  send()
  {
    this.login.sentUsername = this.sUsername;
    this.login.sentPassword = this.sPassword;
    console.log("Form sent from login\r\n");
    console.log(this.login);
  }
}


