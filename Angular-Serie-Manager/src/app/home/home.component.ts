import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AutorisationService } from '../autorisation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  login = false;
  constructor(private router: Router,private autor: AutorisationService) { }
  ngOnInit() {
    this.autor.login.subscribe((login) => {
      this.login = login;
    });
  }
  register()
  {
    this.router.navigate(['/register']);
  }
 }
