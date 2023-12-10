import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [CommonModule, RegisterComponent]
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  users: any;

  registerMode = false;
  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
  getUsers() {
    this.http.get('https://localhost:7239/api/users').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.log(error),
      complete: () => console.log('Request has completed'),
    });
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
