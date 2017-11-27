import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
//	readonly ROOT_URL = 'https://jsonplaceholder.typicode.com';
//	readonly ROOT_URL = 'api.themoviedb.org';
//	posts: any;
	search = "";

	@Output() query = new EventEmitter<string>();

  constructor() {

   }

	  ngOnInit() {
	  
	  }


	sendQuery(search){
		console.log(search);
		this.query.emit(this.search);
	}

}
