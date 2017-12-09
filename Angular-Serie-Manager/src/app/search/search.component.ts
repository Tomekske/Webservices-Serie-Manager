import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

interface searchSerie{
	page: number,
	total_results: number,
	results: { 
		name: string,
		id: number,
		overview: string,
		poster_path: string
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	private routeSub: any;
	name = '';
	posts: any;
	tot_results = 0;
	x = 0;
	pictureBaseUrl = 'https://image.tmdb.org/t/p/w500/';
	pictureFullUrl = '';
	serie :{
		name: string,
		description: string,
		url: string
	}[] = [];

  constructor(private route: ActivatedRoute,private http: HttpClient,private router: Router) { }


  ngOnInit() {
  		console.log("ok");
  	  	this.routeSub = this.route.params.subscribe(params =>{
  			this.name =	params['name'];	
  			this.router.navigate(["/search/"+this.name]);

  		});


this.posts = this.http.get<searchSerie>('http://api.themoviedb.org/3/search/tv?page=1&query='+ this.name +'&language=en-US&api_key=a7fbc4b37ef74e87e3d943a1fa2df6b1').subscribe(data =>{
  		this.tot_results = data.total_results;	
	    for(let i=0;i< this.tot_results;i++)
	    {
	   		this.pictureFullUrl = this.pictureBaseUrl + data.results[i].poster_path;
	   		this.serie.push({ name: data.results[i].name, description: data.results[i].overview, url: this.pictureFullUrl });
//	    	console.log("Title:",data.results[i].name);
	    }
 	 });
  }
}
