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
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    BsDropdownModule,
    RouterModule,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isOpen: boolean = false;
  loggedIn = false;
  currentUser$: Observable<User | null> = of(null);
  loginError: string = '';

  constructor(
    public accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.currentUser$.subscribe(user => console.log(user));
  }

  model: any = {};
  login() {
    this.accountService.login(this.model).subscribe({
      next: (_) => this.router.navigateByUrl('/members'),
      error: (error) => {
        console.log(error);
        this.loginError = 'Incorrect Email or Password. Please try again.';
        setTimeout(() => {
          this.loginError = '';
        }, 5000); // hide error after 5 seconds
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
