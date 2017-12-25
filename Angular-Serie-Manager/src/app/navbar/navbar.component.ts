import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AutorisationService } from '../autorisation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	search = "";
	baseSearch = '/search/';
	fullSearch = '';
	y_search: string;
    sub: Subscription;
    login = false;
    admin = false;
  constructor(private route: ActivatedRoute,private router: Router,private autor: AutorisationService) {

   }

	ngOnInit(){
		this.sub = this.autor.login.subscribe((login) => {
			this.login = login;
		});
		
		this.autor.admin.subscribe((admin) =>{
			console.log('admin',admin);
			this.admin = admin;
		});
	}


	sendQuery(search){
		this.fullSearch = this.baseSearch + this.search;
		this.route.params.subscribe(params =>{
  			this.router.navigate([this.fullSearch]);
  			console.log("hier");
  		});
	}
}
