import { Component, ViewChild, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  test = "";
  title = 'app';

  getQuery(event){
  	console.log("Output:",event);
    this.test = event;
  }
}
