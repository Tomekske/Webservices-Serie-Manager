import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AutorisationService } from '../autorisation.service';

interface searchSerie{
	connection: boolean,
	total_results: number,
	collection: { 
		title: string,
		description: string,
		picture: string
	}
}

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.css']
})
export class UserCollectionComponent implements OnInit {
	user_id = 0;
	total_results = 0;
  results = false;
	collection: { 
		title: string,
		description: string,
		picture: string
	}[] = [];
  constructor(private router: Router,private route: ActivatedRoute,private http: HttpClient,private autor: AutorisationService) { }

  ngOnInit() {
  	this.route.params.subscribe(params =>{
		this.user_id =	params['id'];	
	});

    this.autor.login.subscribe((login) =>{
        if(!login){
          this.router.navigate(["/"]);
        }
    });
	
    this.http.get<searchSerie>('http://localhost:5000/collection/get?id=' + this.user_id).subscribe(data =>{
  		this.total_results = data.total_results;
      if(this.total_results == 0)
      {
        this.results = false;
      }

      else
      {
        this.results = true;
      }

  		for(let i = 0;i < this.total_results; i++)
  		{
  			this.collection.push({
  				title: data.collection[i].title,
  				description: data.collection[i].description,
  				picture: data.collection[i].picture
  			});
  		}				
  	});
  }
}