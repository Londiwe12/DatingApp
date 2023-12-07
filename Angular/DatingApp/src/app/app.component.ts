import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AccountService } from './_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { User } from './_models/user';
import { HomeComponent } from "./home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [HttpClientModule] // Add this line to import the HttpClientModule
    ,
    imports: [CommonModule, RouterOutlet, HttpClientModule, NavComponent, FormsModule, AccountService, HomeComponent]
})
export class AppComponent implements OnInit {
    title = 'DatingApp';
  users: any;
  model:any ={}
  readonly APIUrl = "https://localhost:7239/api"
  constructor (private http:HttpClient, private accountService: AccountService ){}

  getUsersList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/users');
    
  }

  ngOnInit(): void {
    this.getUsersList().subscribe(data => {
      console.log(data)
      this.users= data;
      this.setCurrentUser();
    })
  }
  login(){
    console.log(this.model)
  }
    // Import the BsDropdownModule in the component's TypeScript file
    static forRoot() {
      return {
        ngModule: NavComponent,
        providers: [],
        imports: [BsDropdownModule.forRoot()]
      }
  }


  setCurrentUser(){
    const userString = localStorage.getItem(('user'))
    if(!userString) return;
    const user: User = JSON.parse(userString)
    this.accountService.setCurrentUser(user)
    
  }


}