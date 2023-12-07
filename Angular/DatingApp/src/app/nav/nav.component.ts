import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit{
  isOpen: boolean = false;
  loggedIn = false;
  currentUser$ : Observable<User | null> = of(null)
  constructor (public accountService : AccountService){}
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$
    
  }
  getCurrentuser(){
    this.accountService.currentUser$.subscribe({
      next :user =>this.loggedIn = !!user,
      error: error => console.log(error)
    })
  }
  model:any ={}
  login(){
    this.accountService.login(this.model).subscribe({
      next : response =>{
        console.log(response);
      },
      error: error => console.log (error)
    })
  }
  logout(){
    this.accountService.logout()

  }


}
