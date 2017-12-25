import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/Forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AutorisationService } from './autorisation.service';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PopularComponent } from './popular/popular.component';
import { SerieComponent } from './serie/serie.component';
import { SearchComponent } from './search/search.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateComponent } from './update/update.component';
import { LogoutComponent } from './logout/logout.component';
import { CollectionComponent } from './collection/collection.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PopularComponent,
    SerieComponent,
    SearchComponent,
    UsersComponent,
    DashboardComponent,
    UpdateComponent,
    LogoutComponent,
    CollectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
        { path: '', component: HomeComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'login', component: LoginComponent },
        { path: 'logout', component: LogoutComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'popular', component: PopularComponent },
        { path: 'serie/:name', component: SerieComponent },
        { path: 'search/:name', component: SearchComponent },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'dashboard/update/:id', component: UpdateComponent },
        { path: 'collection', component: CollectionComponent },
    ])
  ],
  providers: [AutorisationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
