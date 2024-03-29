import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute,Router, Params } from '@angular/router';
import { AutorisationService } from '../autorisation.service';

interface Users{
	total_results: number,
	results:{
		id: number,
		username: string,
		email: string,
		password: string
		admin: boolean
	}
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  httpObs: Observable<any>;
	posts: any;
  admin = false;
  baseUrl = 'http://localhost:5000/users/delete?id=';
	users: {
    	id: number,
    	username: string,
    	email: string,
    	password: string
    	admin: boolean
  	}[] = [];
  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router,private autor: AutorisationService) { }

  ngOnInit() {
      this.autor.admin.subscribe((admin) =>{
        if(!admin){
          this.router.navigate(["/"]);
        }
      });
      this.fetchUsers();

  	}

    update_user(id)
    {
      this.router.navigate(['/dashboard/update/'+ id]);
    }

    delete_user(id)
    {
      this.http.delete(this.baseUrl+id).subscribe(data =>{

        if(data['connection'] === 'true')
        {
          this.route.params.subscribe( () => {
             this.users.length = 0;
             this.fetchUsers();        
          });   
        }
        else
        {
          alert("Could not delete user");
        }
      });
    }

    fetchUsers()
    {
      this.posts = this.http.get<Users>('http://localhost:5000/users').subscribe(data =>{

       if(data['connection'] === 'true')
       {

        for(let i = 0; i < data.total_results;i++)
        {
          this.users.push({
              id: data.results[i].id,
              username: data.results[i].username,
              email: data.results[i].email,
              password: data.results[i].password,
              admin: data.results[i].admin
          });
        }
       }

       else
       {
        alert("Could not connect with database");
       }
    
      });
    }
}

