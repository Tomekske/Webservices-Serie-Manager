import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

interface Users{
  id: number,
	username: string,
	email: string,
	password: string
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
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
  			// for(let i = 0; i < data.lenght;i++)
     //    {

     //    }
     console.log(data[0].name)
  		});

  }

}
