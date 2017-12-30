import { Component, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AutorisationService } from '../autorisation.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    login = false;

  constructor(private router: Router,private autor: AutorisationService) { }

  ngOnInit() {
  	this.autor.setLogin(false);
  	this.autor.setAdmin(false);
    this.autor.setId(0);
  	this.router.navigate(["/"]);
  }
}
