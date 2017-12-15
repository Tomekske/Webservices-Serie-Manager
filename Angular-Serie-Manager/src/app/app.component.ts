import { Component,OnInit, ViewChild, Input, Output } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AutorisationService } from './autorisation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  login = false;
  constructor(private router: Router,private autor: AutorisationService) { }
  ngOnInit() {
	this.autor.login.subscribe((login) => {
		this.login = login;
	});
  	
  }

}
