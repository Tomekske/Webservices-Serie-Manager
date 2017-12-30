import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AutorisationService } from '../autorisation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  admin = false;
  constructor(private autor: AutorisationService) { }

  ngOnInit() {
		this.autor.admin.subscribe((admin) =>{
			this.admin = admin;
		});
  }
}
