import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    title = 'DatingApp';
  users: any;
  readonly APIUrl = "https://localhost:7239/api"
  constructor (private http:HttpClient ){}

  getUsersList(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/users');
    
  }

  ngOnInit(): void {
    this.getUsersList().subscribe(data => {
      console.log(data)
      this.users= data;
    })
  }
  }


