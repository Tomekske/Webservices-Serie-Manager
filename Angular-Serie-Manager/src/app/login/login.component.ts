import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { AutorisationService } from '../autorisation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  sUsername = "";
  sPassword = "";
  httpObs: any;

  failed = false;

  login = {
    sentUsername: "",
    sentPassword: ""
  };
  constructor(private autor: AutorisationService,private router: Router) { }

  ngOnInit() {

  }

  send()
  {

    this.login.sentUsername = this.sUsername;
    this.login.sentPassword = this.sPassword;
    
    this.autor.login_user(this.sUsername,this.sPassword);
    this.httpObs = this.autor.login_user(this.login.sentUsername,this.login.sentPassword);
    this.httpObs.subscribe(res =>{
      
      if(res['connection'] === 'true')
      {
        if(res['results'] === 'true')
        {
          this.failed = false;
          this.autor.setLogin(true);
          this.autor.setId(res['id']);

          if(res['admin'] === 'true')
          {
            this.autor.setAdmin(true);
          }

          this.router.navigate(["/"]);
        }
        else
        {
          this.autor.setLogin(false);
          this.failed = true;
        }
      }
      else
      {
        alert("Problems loggin in");
      }
    });
  }
}


