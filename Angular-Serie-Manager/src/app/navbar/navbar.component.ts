import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params,Router } from '@angular/router';


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
	@Output() query = new EventEmitter<string>();

  constructor(private route: ActivatedRoute,private router: Router) {

   }

	  ngOnInit() {

	  }


	sendQuery(search){
		this.fullSearch = this.baseSearch + this.search;
		this.route.params.subscribe(params =>{
  			this.router.navigate([this.fullSearch]);
  			console.log("hier");
  		});

//		this.route.params.subscribe(params =>{
//		});	


//		this.route.params.subscribe((params: Params) =>{
//			this.fullSearch = '';
//			this.y_search = params['search'];
//		    this.fullSearch = this.baseSearch + this.search;
//		   console.log('y-search',this.y_search);
//		    console.log('url',this.fullSearch);
			//params.navigate([this.fullSearch]);
			
//		});

//		console.log(search);
//		console.log(this.fullSearch);
		this.query.emit(this.search);
	}

}
