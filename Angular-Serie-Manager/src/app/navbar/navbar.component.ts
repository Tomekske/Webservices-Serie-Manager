import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
