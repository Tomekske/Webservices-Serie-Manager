import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sUsername = "";
  sPassword = "";
  sEmail = "";

  register = {
    sentUsername: "",
    sentEmail: "",
    sentPassword: ""
  };
  constructor() { }

  ngOnInit() {

  }

  send()
  {
    this.register.sentUsername = this.sUsername;
    this.register.sentEmail = this.sEmail;
    this.register.sentPassword = this.sPassword;

    console.log("Form sent from register\r\n");
    console.log(this.register);
  }
}
