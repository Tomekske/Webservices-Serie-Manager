import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AutorisationService {
	httpObs: any;
	baseUrl = 'http://localhost:5000/login';

  private src_login = new BehaviorSubject<boolean>(false);
  login = this.src_login.asObservable();

  private src_admin = new BehaviorSubject<boolean>(false);
  admin = this.src_admin.asObservable();

  private src_id = new BehaviorSubject<number>(0);
  id = this.src_id.asObservable();
	request = {
  		username : "",
  		password : "",
  	};
  constructor(private http: HttpClient) {   }


  login_user(username: string, password: string){
  	this.request.username = username;
  	this.request.password = password;
  	return this.http.post(this.baseUrl, JSON.stringify(this.request),{headers: new HttpHeaders().set('Content-Type', 'application/json')})
     
  }

  setLogin(sLogin: boolean){
  	this.src_login.next(sLogin);
  }

  setAdmin(sAdmin: boolean){
    this.src_admin.next(sAdmin);
  }

  setId(sId: number){
    this.src_id.next(sId);
  }
}
