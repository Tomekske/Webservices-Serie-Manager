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
		collection: { 
		title: string,
		description: string,
		picture: string
	}[] = [];
  constructor(private route: ActivatedRoute,private http: HttpClient,private autor: AutorisationService) { }

  ngOnInit() {
	this.autor.id.subscribe((id) =>{
        this.user_id = id;
         console.log("user_id:", this.user_id);

    });
    this.http.get<searchSerie>('http://localhost:5000/collection/get?id=' + this.user_id).subscribe(data =>{
  		this.total_results = data.total_results;

  		for(let i = 0;i < this.total_results; i++)
  		{
  			console.log("url:", data.collection[i].picture)
  			this.collection.push({
  				title: data.collection[i].title,
  				description: data.collection[i].description,
  				picture: data.collection[i].picture
  			});
  		}				
  	});


  }

}
