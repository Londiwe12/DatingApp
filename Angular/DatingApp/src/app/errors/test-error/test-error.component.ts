import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css'],
  standalone:true
})
export class TestErrorComponent implements OnInit {
  baseUrl = "https://localhost:7239/api";

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
  }

  get404Error() {
    const headers = this.getHeaders();

    this.http.get(this.baseUrl + '/buggy/not-found', { headers }).subscribe({
      next: response => console.log(response),
      error: error => {
        if (error) {
          console.log(error.length);
        }
      }
    })
  }

  get400Error() {
    const headers = this.getHeaders();

    this.http.get(this.baseUrl + '/buggy/bad-request').subscribe({
      next: response => console.log(response),
      error: error => {
        if (error) {
          console.log(error.length);
        }
      }
    })
  }

  get500Error() {
    const headers = this.getHeaders();

    this.http.get(this.baseUrl + '/buggy/server-error', { headers }).subscribe({
      next: response => console.log(response),
      error: error => {
        if (error) {
          console.log(error.length);
        }
      }
    });
  }

  get401Error() {
    const headers = this.getHeaders();

    this.http.get(this.baseUrl + '/buggy/auth', { headers }).subscribe({
      next: response => console.log(response),
      error: error => {
        if (error) {
          console.log(error.length);
        }
      }
    })
  }

  get400ValidationError() {
    const headers = this.getHeaders();

    this.http.post(this.baseUrl + '/account/register', {}, { headers }).subscribe({
      next: response => console.log(response),
      error: error => {
        if (error) {
          console.log(error.length);
        }
      }
    })
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
