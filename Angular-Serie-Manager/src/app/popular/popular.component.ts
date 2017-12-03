import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface popularSeries{
	page: number,
	total_results: number,
	total_pages: number,
	results: { 
		original_name: string,
		genre_ids: number[],
		name: string,
		popularity: number,
		origin_country: string[],
		vote_count: number,
		first_air_date: string,
		backdrop_path: string,
		original_language: string,
		id: number,
		vote_average: number;
		overview: string,
		poster_path: string
  }
}
@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
	posts: any;
	pictureBaseUrl = 'https://image.tmdb.org/t/p/w500/';
	pictureFullUrl = '';
    popular: { name: string, description: string, url: string }[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() 
  {
  	this.posts = this.http.get<popularSeries>('https://api.themoviedb.org/3/discover/tv?api_key=a7fbc4b37ef74e87e3d943a1fa2df6b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1').subscribe(data =>{
  
	    for(let i=0;i<20;i++)
	    {
	   		this.pictureFullUrl = this.pictureBaseUrl + data.results[i].poster_path;
	   		console.log(this.pictureBaseUrl);
	   		this.popular.push({ name: data.results[i].name, description: data.results[i].overview, url: this.pictureFullUrl });
	    }
 	 })
  }
}

