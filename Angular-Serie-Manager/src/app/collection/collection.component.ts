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
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})

export class CollectionComponent implements OnInit {
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
     this.autor.login.subscribe((login) =>{
        if(!login){
          this.router.navigate(["/"]);
        }
      });
  	this.autor.id.subscribe((id) =>{
        this.user_id = id;
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
