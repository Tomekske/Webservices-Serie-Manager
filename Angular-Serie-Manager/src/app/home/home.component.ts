import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AutorisationService } from '../autorisation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  sub: Subscription;
    ii = false;
    msg:string;
  constructor(private autor: AutorisationService) { }
  ngOnInit() {
  //	console.log("hiihi",this.autor.login);


      this.sub = this.autor.login.subscribe((curr) => {
          console.log('login',curr);
        });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }



 }
