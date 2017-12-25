import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute,Router, Params } from '@angular/router';
import { AutorisationService } from '../autorisation.service';

interface basicInformation{
	 results: { 
	 	name: string,
	 	id: number,
	 	overview: string,
		poster_path: string
	}[]
}

//---------------------------------------------------

interface advancedInformation{
	name: string,
	number_of_episodes: number,
	number_of_seasons: number,
	status: string,
}

//----------------------------------

interface episodesPerSeason{
	episodes:{
		episode_number: number,
		name: string
	}[],
	season_number: number
}


@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {
	serie_information:{
		serie: string,
		id: number,
		description: string,
		seasons_amount: number,
		url: string
	}[] = [];

	f_episodes:{
		ep_number: number,
		title: string
	}[] = [];

	collection:{
		title: string,
		description: string,
		picture: string,
		user_id: number
	} = {
		title: '',
		description: '',
		picture: '',
		user_id: 0	};
    
	user_id = 0;
	id: number = 0;
	serie = "";
	description = "";
	amount_of_seasons = 0;
    amount_of_episodes = 0;

	posts: any;
	nPost: any;
	wPost: any;
	private routeSub: any;
	name = '';
	pictureBaseUrl = 'https://image.tmdb.org/t/p/w500/';
	pictureFullUrl = '';
    baseUrl = 'http://api.themoviedb.org/3/tv/';
    fullUrl = '';
    api_key = 'a7fbc4b37ef74e87e3d943a1fa2df6b1';

    fakeArray=[];



  constructor(private route: ActivatedRoute,private http: HttpClient,private autor: AutorisationService) { }

  ngOnInit() {
	this.autor.id.subscribe((id) =>{
        this.user_id = id;
    });

  	this.routeSub = this.route.params.subscribe(params =>{
  		this.name =	params['name'];	
  		
  	 })

	  	this.posts = this.http.get<basicInformation>('http://api.themoviedb.org/3/search/tv?page=1&query='+ this.name +'&language=en-US&api_key=' + this.api_key).subscribe(data =>{
   			this.id = data.results[0].id;
   			this.serie = data.results[0].name;
   			this.description = data.results[0].overview;

   			console.log('id',this.id);
   			this.fullUrl = this.baseUrl + this.id + this.api_key;
   			this.pictureFullUrl = this.pictureBaseUrl + data.results[0].poster_path;

   			//next http request
	  		this.nPost = this.http.get<advancedInformation>('http://api.themoviedb.org/3/tv/'+ this.id +'?api_key=' + this.api_key).subscribe(advInfo =>{
  				this.amount_of_seasons = advInfo.number_of_seasons;
  				//this.amount_of_seasons = 5;

	  			this.serie_information.push({
	  				serie: this.serie,
	  				id: this.id,
	  				description: this.description,
	  				seasons_amount: this.amount_of_seasons,
	  				url: this.pictureFullUrl
	  			});


	  			for(let i = 0;i < this.amount_of_seasons;i++)
	  			{
	  				this.fakeArray.push(i);		
	  			}
  	  		});  		
  	  	});
  }


  	onChange(season) {
    console.log(season);
    this.wPost = this.http.get<episodesPerSeason>('https://api.themoviedb.org/3/tv/'+ this.id +'/season/'+ season +'?api_key=' + this.api_key).subscribe(serieInfo =>{
 		this.amount_of_episodes = serieInfo.episodes.length;
 		console.log(this.amount_of_episodes);

 		if(this.f_episodes.length != 0)
 		{
 			this.f_episodes.length = 0;
 		}

 		for(let i = 0;i < this.amount_of_episodes; i++)
 		{
 			this.f_episodes.push({
			 	ep_number: serieInfo.episodes[i].episode_number,
			 	title: serieInfo.episodes[i].name	
			});
 		}						
 	});
}


	addToCollection(title: string, description: string, picture: string){
		console.log(title);
		console.log(description);
		console.log('foto', picture);
		this.collection.title = title;
		this.collection.description = description;
		this.collection.picture = picture;
		this.collection.user_id = this.user_id;
		    this.http.post('http://localhost:5000/collection/add', JSON.stringify(this.collection),{headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe(res => {
  		console.log(res); 
      });
	}
    ngOnDestroy(){
  	this.routeSub.unsubscribe();
  }

}
