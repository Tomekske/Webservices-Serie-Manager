import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit() {
  	  	console.log("Input:",this.data);

  }

  ngOnChanges(){
    	  	console.log("Input:",this.data);	
  }

}
