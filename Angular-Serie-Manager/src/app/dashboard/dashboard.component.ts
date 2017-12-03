import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

interface Users{
	total_results: number,
	results:{
		id: number,
		username: string,
		email: string,
		password: string
	}
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	posts: any;
	users: {
    	id: number,
    	username: string,
    	email: string,
    	password: string
  	}[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
  		this.posts = this.http.get<Users>('http://localhost:5000/users',).subscribe(data =>{
  			//this.users.push(data);
  			console.log(data.total_results);
  			for(let i = 0; i < data.total_results;i++)
  			{
  				this.users.push({
  						id: data.results[i].id,
    					username: data.results[i].username,
    					email: data.results[i].email,
    					password: data.results[i].password});
  			}

  			console.log(this.users[0]);
  					
  		});

  }

}

