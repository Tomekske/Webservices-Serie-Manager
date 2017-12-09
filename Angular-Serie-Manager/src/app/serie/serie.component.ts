import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

//-----------------------------------

interface episodes {
    ep_number: number,
	title: string
}

// interface season {
//     s_episodes: episodes[];
// }

//----------------------------------

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
    
    f_season: episodes[][] = [];
	
	// q_episodes:{
	// 		ep_number: number,
	// 		title: string
	// 	}[] = [];

	// q_season: {
	// 	s_episodes: {
	// 		[key: number] : episodes
	// 	}

	// }[] = [];


	// test: season = {
	// 	s_episodes: [{
	// 		ep_number:1,
	// 		title: "1 qqqq"
	// 	},
	// 	{
	// 		ep_number:2,
	// 		title: "2 qqqq"		
	// 	},
	// 	{
	// 		ep_number:3,
	// 		title: "3 qqqq"		
	// 	}]
	// };


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



  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {

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


//--------------------------------------------------------------------------------


 				for(let j = 1;j <= this.amount_of_seasons;j++)
 				{
 					this.wPost = this.http.get<episodesPerSeason>('https://api.themoviedb.org/3/tv/'+ this.id +'/season/'+ 1 +'?api_key=' + this.api_key).subscribe(serieInfo =>{
 						this.amount_of_episodes = serieInfo.episodes.length;


 						//console.log(this.amount_of_episodes);
 						//console.log(serieInfo.episodes[j-1].name);

						for(let i = 0;i < this.amount_of_episodes;i++)
						{

							this.f_episodes.push({
							 	ep_number: serieInfo.episodes[i].episode_number,
							 	title: serieInfo.episodes[i].name								
							});

						}
						//console.log(j);


						this.f_season.push(this.f_episodes);
 					for(let i; i < this.amount_of_episodes;i++)
 			     	{
 			     		this.f_episodes.pop();
 			     	}
						console.log(this.f_episodes);						
 			     	});


		     	}
  	  		});  		
  	  	});
  }
    ngOnDestroy(){
  	this.routeSub.unsubscribe();
  }

}
// episodes:{
// 		season: number,
// 		ep_information:{
// 			id: number,
// 			title: string
// 		}[]
// 	}[] = [];