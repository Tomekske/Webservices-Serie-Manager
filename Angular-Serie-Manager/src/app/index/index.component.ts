import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  username = "";
  btndis= true;

  constructor() { }

  ngOnInit() {
  }
  clearfield() {
    this.username = "";
    this.btndis = true;
  }
  functie1() 
  {
    if (this.username.length === 0) 
    {
      this.btndis = true;
    }
    else 
    {
        this.btndis = false;
    }
  }
}
